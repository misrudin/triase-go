<?php

namespace App\Http\Controllers;

use App\Models\TriageLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TriageLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $triageLevels = TriageLevel::when($search, function ($query, $search) {
            $query->where('level', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        })->latest()->get();

        return Inertia::render('Admin/TriageLevel', [
            'data' => $triageLevels,
            'filters' => [
                'search' => $search
            ],
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
            'level' => 'required|string|max:255|unique:triage_levels,level',
            'description' => 'required|string|max:500',
        ]);

        try {
            TriageLevel::create($validatedData);

            return redirect()->back()->with('success', 'Triage Level created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TriageLevel $triageLevel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TriageLevel $triageLevel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TriageLevel $triageLevel)
    {
        $validatedData = $request->validate([
            'level' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        try {
            $triageLevel->update($validatedData);

            return redirect()->back()->with('success', 'Triage Level created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TriageLevel $triageLevel)
    {
        try {
            $triageLevel->delete();
            return redirect()->back()->with('success', 'Triage Level deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete Triage Level: ' . $e->getMessage());
        }
    }
}
