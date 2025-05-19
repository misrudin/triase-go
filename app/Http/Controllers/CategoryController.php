<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a paginated listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page', 1);
        $length = $request->input('length', 10);

        $query = Category::when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })->latest();

        $categories = $query->paginate($length, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'data' => $categories->items(),
            'meta' => [
                'current_page' => $categories->currentPage(),
                'last_page' => $categories->lastPage(),
                'per_page' => $categories->perPage(),
                'total' => $categories->total(),
            ]
        ]);
    }

    /**
     * Get all categories without pagination (for dropdown, etc).
     */
    public function getAll()
    {
        $categories = Category::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return response()->json([
            'success' => true,
            'data' => $category,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $category = Category::create($validatedData);
            return response()->json([
                'success' => true,
                'message' => 'Category created successfully!',
                'data' => $category,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $category->update($validatedData);
            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully!',
                'data' => $category,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}