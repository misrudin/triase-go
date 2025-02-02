<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use Illuminate\Http\Request;
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
            ->values();
            ;

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
        //
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
