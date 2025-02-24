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

        $data = Triage::with('patient')
            ->with('user')
            ->with('painLocations')
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
            ->latest()
            ->get();

        return Inertia::render('Admin/Triage', [
            'data' => $data,
            'filters' => [
                'search' => $search,
                'status' => $statusTriage,
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = ChecklistItem::with('triageLevel')->with('category')
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
            'data' => $data,
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
            'birth_date' => 'nullable|string',
            'address' => 'nullable|string',
            'allergy' => 'nullable|string',
            'symptoms' => 'nullable|string',
            'phone' => 'nullable|string',
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Triage $triage)
    {
        //
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
        //
    }
}
