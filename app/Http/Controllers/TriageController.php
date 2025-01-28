<?php

namespace App\Http\Controllers;

use App\Models\Triage;
use Illuminate\Http\Request;
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

        $data = Triage::with('patient')->with('user')
            ->when($search, function ($query, $search) use ($statusTriage) {
                $query->where('triage_no', 'like', "%{$search}%")
                    ->orWhereHas('patient', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', "%{$search}%");
                    })
                    ->orWhere('allergy', 'like', "%{$search}%")
                    ->orWhere('complaint', 'like', "%{$search}%");
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
