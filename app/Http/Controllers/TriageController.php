<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use App\Models\Patient;
use App\Models\Triage;
use App\Models\TriageLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TriageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $statusTriage = $request->input('status');
        $perPage = $request->input('length', 10);
        $page = $request->input('page', 1);

        $user = auth()->user();
        $priority = TriageLevel::orderBy('priority', 'asc')
            ->pluck('level')
            ->toArray();

        $query = Triage::with('patient')
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
            ->latest();

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        $data->getCollection()->transform(function ($triage) use ($priority) {
            $levels = $triage->triageChecklists->map(function ($checklist) {
                return $checklist->checklistItem->triageLevel->level ?? null;
            })->filter()->toArray();

            $highestLevel = collect($priority)->first(fn($level) => in_array($level, $levels)) ?? '';

            $triage->level = $highestLevel;

            return $triage;
        });

        $filtered = $data->getCollection()->map(function ($triage) {
            return [
                'id' => $triage->id,
                'name' => $triage->patient->name ?? null,
                'triage_no' => $triage->triage_no,
                'level' => $triage->level,
                'patient' => $triage->patient,
                'allergy' => $triage->allergy,
                'symptoms' => $triage->symptoms,
                'created_at' => $triage->created_at,
                'status' => $triage->status,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $filtered,
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getChecklistItem()
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
            ->values();

        return response()->json([
            'success' => true,
            'data' => $checklist,
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
            $patient = Patient::create($request->only([
                'name',
                'nik',
                'gender',
                'date_of_birth',
                'address',
                'phone_number'
            ]));

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

            return response()->json([
                'success' => true,
                'message' => 'Triage data stored successfully',
                'data' => [
                    'triage_id' => $triage->id,
                    'patient_id' => $patient->id,
                ]
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to store triage data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Triage $triage)
    {
        $user = auth()->user();
        $priority = TriageLevel::orderBy('priority', 'asc')
            ->pluck('level')
            ->toArray();

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
            'triage_no' => $triage->triage_no,
            'level' => $triage->level,
            'name' => $triage->patient->name ?? null,
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

        return response()->json([
            'success' => true,
            'message' => 'Triage data retrieved successfully',
            'data' => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Triage $triage)
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
            // Update data pasien
            $triage->patient->update($request->only([
                'name',
                'nik',
                'gender',
                'date_of_birth',
                'address',
                'phone_number'
            ]));

            // Update data triase
            $triage->update([
                'allergy' => $request->input('allergy'),
                'symptoms' => $request->input('symptoms'),
            ]);

            // Hapus dan ganti ulang lokasi nyeri
            $triage->painLocations()->delete();
            foreach ($validatedData['bodyPaint'] as $bodyPaint) {
                $triage->painLocations()->create([
                    'x' => $bodyPaint['x'],
                    'y' => $bodyPaint['y'],
                    'name' => $bodyPaint['name'],
                    'notes' => $bodyPaint['notes'] ?? null,
                ]);
            }

            // Hapus dan ganti ulang checklist
            $triage->triageChecklists()->delete();
            foreach ($validatedData['triageChecklist'] as $checklist) {
                $triage->triageChecklists()->create([
                    'checklist_item_id' => $checklist['checklist_item_id'],
                    'checked' => $checklist['checked'],
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Triage data updated successfully',
                'data' => [
                    'triage_id' => $triage->id,
                    'patient_id' => $triage->patient->id,
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to update triage data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Triage $triage)
    {
        try {
            $triage->delete();

            return response()->json([
                'success' => true,
                'message' => 'Triage berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus triage: ' . $e->getMessage(),
            ], 500);
        }
    }
}
