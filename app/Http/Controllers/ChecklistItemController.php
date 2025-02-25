<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ChecklistItem;
use App\Models\TriageLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChecklistItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $data = ChecklistItem::with('triageLevel')->with('category')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('triageLevel', function ($query) use ($search) {
                        $query->where('level', 'like', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('description', 'like', "%{$search}%");
            })->latest()->get();

        $levels = TriageLevel::latest()->get();
        $categories = Category::latest()->get();

        return Inertia::render('Admin/ChecklistItem', [
            'data' => $data,
            'filters' => [
                'search' => $search
            ],
            'levels' => $levels,
            'categories' => $categories,
            'title' => 'Master Data Checklist',
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
            'description' => 'required|string|max:500',
            'triage_level_id' => 'required|exists:triage_levels,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        try {
            ChecklistItem::create($validatedData);
            return redirect()->back()->with('success', 'Checklist Item created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ChecklistItem $checklistItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChecklistItem $checklistItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChecklistItem $checklistItem)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'triage_level_id' => 'required|exists:triage_levels,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        try {
            $checklistItem->update($validatedData);
            return redirect()->back()->with('success', 'Checklist Item updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChecklistItem $checklistItem)
    {
        try {
            $checklistItem->delete();
            return redirect()->back()->with('success', 'Checklist Item deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete Checklist Item: ' . $e->getMessage());
        }
    }
}
