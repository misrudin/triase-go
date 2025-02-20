<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use App\Models\Patient;
use App\Models\Triage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserTriageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|string',
            'bodyPaint' => 'required|array',
            'bodyPaint.*.x' => 'required|numeric',
            'bodyPaint.*.y' => 'required|numeric',
            'bodyPaint.*.name' => 'required|string|max:255',
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
