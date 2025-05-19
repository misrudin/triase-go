<?php

namespace App\Http\Controllers;

use App\Models\TriageLevel;
use Illuminate\Http\Request;

class TriageLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page', 1);
        $length = $request->input('length', 10);

        $query = TriageLevel::when($search, function ($query, $search) {
            $query->where('level', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        })->latest();

        $triageLevels = $query->paginate($length, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'data' => $triageLevels->items(),
            'meta' => [
                'current_page' => $triageLevels->currentPage(),
                'last_page' => $triageLevels->lastPage(),
                'per_page' => $triageLevels->perPage(),
                'total' => $triageLevels->total(),
            ],
        ]);
    }

    public function getAll()
    {
        $triageLevels = TriageLevel::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $triageLevels,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'level' => 'required|string|max:255|unique:triage_levels,level',
            'description' => 'required|string|max:500',
            'priority' => 'required|integer|min:0',
        ]);

        try {
            $triageLevel = TriageLevel::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Triage Level created successfully!',
                'data' => $triageLevel,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create Triage Level',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TriageLevel $triageLevel)
    {
        return response()->json([
            'success' => true,
            'data' => $triageLevel,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TriageLevel $triageLevel)
    {
        $validatedData = $request->validate([
            'level' => 'required|string|max:255|unique:triage_levels,level,' . $triageLevel->id,
            'description' => 'nullable|string|max:500',
            'priority' => 'required|integer|min:0',
        ]);

        try {
            $triageLevel->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Triage Level updated successfully!',
                'data' => $triageLevel,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update Triage Level',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TriageLevel $triageLevel)
    {
        try {
            $triageLevel->delete();

            return response()->json([
                'success' => true,
                'message' => 'Triage Level deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete Triage Level',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}