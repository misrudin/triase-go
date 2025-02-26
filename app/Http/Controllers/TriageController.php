<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use App\Models\Patient;
use App\Models\Triage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TriageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $statusTriage = $request->input('status');
        $user = auth()->user();
        $priority = ['black', 'green', 'yellow', 'red']; // Urutan prioritas dari rendah ke tinggi

        $data = Triage::with('patient')
            ->with('user')
            ->with('triageChecklists.checklistItem.triageLevel')
            ->with('triageChecklists.checklistItem.category')
            ->when($search, function ($query, $search) use ($statusTriage) {
                $query->where('triage_no', 'like', "%{$search}%")
                    ->orWhereHas('patient', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('allergy', 'like', "%{$search}%")
                    ->orWhere('symptoms', 'like', "%{$search}%");
            })
            ->when($statusTriage, function ($query, $statusTriage) {
                $query->where('status', '=', $statusTriage);
            })
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();


        foreach ($data as $triage) {
            $levels = $triage->triageChecklists->map(function ($checklist) {
                return $checklist->checklistItem->triageLevel->level ?? null;
            })->filter()->toArray();

            $highestLevel = collect($priority)->first(fn($level) => in_array($level, $levels)) ?? '';

            $triage->level = $highestLevel;
        }

        $filtered = $data->map(function ($triage) {
            return [
                'id' => $triage->id,
                'name' => $triage->patient->name ?? null,
                'triage_no' => $triage->triage_no,
                'level' => $triage->level,
                'patient' => $triage->patient,
                'allergy' => $triage->allergy,
                'symptoms' => $triage->symptoms,
                'created_at' => $triage->created_at,
                'status' => $triage->status
            ];
        });

        return Inertia::render('Admin/Triage', [
            'data' => $filtered,
            'filters' => [
                'search' => $search,
                'status' => $statusTriage,
            ],
            'title' => 'Daftar Triase',
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $checklist = ChecklistItem::with('triageLevel')->with('category')
            ->latest()->get()
            ->groupBy('category.name')
            ->map(function ($items, $category) {
                return [
                    'category' => $category,
                    'items' => $items->values(),
                ];
            })
            ->values();;

        return Inertia::render('User/Triage', [
            'checklist' => $checklist,
            'title' => 'Tambah Triase',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|string',
            'nik' => 'nullable|string',
            'date_of_birth' => 'nullable|date_format:Y-m-d',
            'address' => 'nullable|string',
            'allergy' => 'nullable|string',
            'symptoms' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'bodyPaint' => 'required|array',
            'bodyPaint.*.x' => 'required|numeric',
            'bodyPaint.*.y' => 'required|numeric',
            'bodyPaint.*.name' => 'required|string|max:255',
            'bodyPaint.*.notes' => 'nullable|string|max:500',
            'triageChecklist' => 'required|array',
            'triageChecklist.*.checklist_item_id' => 'required|exists:checklist_items,id',
            'triageChecklist.*.checked' => 'required|boolean',
        ]);

        DB::beginTransaction();
        try {
            $patient = Patient::create($request->only(['name', 'nik', 'gender', 'date_of_birth', 'address', 'phone_number']));

            $triage = Triage::create([
                'patient_id' => $patient->id,
                'user_id' => auth()->id(),
                'allergy' => $request->input('allergy'),
                'symptoms' => $request->input('symptoms'),
                'status' => 'waiting',
            ]);

            foreach ($validatedData['bodyPaint'] as $bodyPaint) {
                $triage->painLocations()->create([
                    'x' => $bodyPaint['x'],
                    'y' => $bodyPaint['y'],
                    'name' => $bodyPaint['name'],
                    'notes' => $bodyPaint['notes'] ?? null,
                ]);
            }

            foreach ($validatedData['triageChecklist'] as $checklist) {
                $triage->triageChecklists()->create([
                    'checklist_item_id' => $checklist['checklist_item_id'],
                    'checked' => $checklist['checked'],
                ]);
            }

            DB::commit();
            return redirect()->back()->with('success', 'Triage data stored successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to store triage data: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Triage $triage)
    {
        $user = auth()->user();
        $priority = ['black', 'green', 'yellow', 'red'];

        $triage = Triage::with([
            'patient',
            'user',
            'treatments',
            'painLocations',
            'triageChecklists.checklistItem.triageLevel',
            'triageChecklists.checklistItem.category'
        ])
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->findOrFail($triage->id);


        $levels = $triage->triageChecklists->map(function ($checklist) {
            return $checklist->checklistItem->triageLevel->level ?? null;
        })->filter()->toArray();

        $highestLevel = collect($priority)->first(fn($level) => in_array($level, $levels)) ?? '';

        $triage->level = $highestLevel;

        $data = [
            'id' => $triage->id,
            'name' => $triage->patient->name ?? null,
            'triage_no' => $triage->triage_no,
            'level' => $triage->level,
            'patient' => $triage->patient,
            'allergy' => $triage->allergy,
            'symptoms' => $triage->symptoms,
            'created_at' => $triage->created_at,
            'status' => $triage->status,
            'user' => $triage->user,
            'treatments' => $triage->treatments,
            'pain_locations' => $triage->painLocations,
            'triage_checklists' => $triage->triageChecklists,
        ];

        return Inertia::render('Admin/DetailTriage', [
            'data' => $data,
            'title' => 'Detail Triase',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Triage $triage)
    {
        $user = auth()->user();
        $priority = ['black', 'green', 'yellow', 'red'];

        $checklist = ChecklistItem::with('triageLevel')->with('category')
            ->latest()->get()
            ->groupBy('category.name')
            ->map(function ($items, $category) {
                return [
                    'category' => $category,
                    'items' => $items->values(),
                ];
            })
            ->values();;

        $triage = Triage::with([
            'patient',
            'user',
            'treatments',
            'painLocations',
            'triageChecklists.checklistItem.triageLevel',
            'triageChecklists.checklistItem.category'
        ])
            ->when($user->role !== 'admin', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->findOrFail($triage->id);


        $levels = $triage->triageChecklists->map(function ($checklist) {
            return $checklist->checklistItem->triageLevel->level ?? null;
        })->filter()->toArray();

        $highestLevel = collect($priority)->first(fn($level) => in_array($level, $levels)) ?? '';

        $triage->level = $highestLevel;

        $data = [
            'id' => $triage->id,
            'name' => $triage->patient->name ?? null,
            'triage_no' => $triage->triage_no,
            'level' => $triage->level,
            'patient' => $triage->patient,
            'allergy' => $triage->allergy,
            'symptoms' => $triage->symptoms,
            'created_at' => $triage->created_at,
            'status' => $triage->status,
            'user' => $triage->user,
            'treatments' => $triage->treatments,
            'pain_locations' => $triage->painLocations,
            'triage_checklists' => $triage->triageChecklists,
        ];

        return Inertia::render('Admin/EditTriage', [
            'data' => $data,
            'checklist' => $checklist,
            'title' => 'Triase Ulang',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Triage $triage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Triage $triage)
    {
        try {
            $triage->delete();

            return redirect()->back()->with('success', 'Triage berhasil dihapus (soft delete)');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus triage: ' . $e->getMessage());
        }
    }
}
