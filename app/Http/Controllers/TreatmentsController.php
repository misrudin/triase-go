<?php

namespace App\Http\Controllers;

use App\Models\Treatments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TreatmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $data = Treatments::with('triage')->with('user')
            ->when($search, function ($query, $search) {
                $query->where('treatment_detail', 'like', "%{$search}%")
                    ->orWhereHas('triage', function ($query) use ($search) {
                        $query->where('triage_no', 'like', "%{$search}%");
                    })
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    });
            })->latest()->get();

        return Inertia::render('Admin/Treatment', [
            'data' => $data,
            'filters' => [
                'search' => $search
            ],
            'title' => 'Tindakan',
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
    public function show(Treatments $treatments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Treatments $treatments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Treatments $treatments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Treatments $treatments)
    {
        //
    }
}
