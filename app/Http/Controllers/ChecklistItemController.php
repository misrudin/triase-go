<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use Illuminate\Http\Request;

class ChecklistItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page', 1);
        $length = $request->input('length', 10);

        $query = ChecklistItem::with(['triageLevel', 'category'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhereHas('triageLevel', function ($query) use ($search) {
                        $query->where('level', 'like', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('description', 'like', "%{$search}%");
            })->latest();

        $data = $query->paginate($length, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'data' => $data->items(),
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ],
        ]);
    }

    public function getAll()
    {
        $data = ChecklistItem::latest()->get();

        return response()->json([
            'success' => true,
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
            'description' => 'required|string|max:500',
            'triage_level_id' => 'required|exists:triage_levels,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        try {
            $item = ChecklistItem::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Checklist Item created successfully!',
                'data' => $item->load(['triageLevel', 'category']),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create Checklist Item',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ChecklistItem $checklistItem)
    {
        return response()->json([
            'success' => true,
            'data' => $checklistItem->load(['triageLevel', 'category']),
        ]);
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

            return response()->json([
                'success' => true,
                'message' => 'Checklist Item updated successfully!',
                'data' => $checklistItem->load(['triageLevel', 'category']),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update Checklist Item',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChecklistItem $checklistItem)
    {
        try {
            $checklistItem->delete();

            return response()->json([
                'success' => true,
                'message' => 'Checklist Item deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete Checklist Item',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
