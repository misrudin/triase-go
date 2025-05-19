<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('length', 10);
        $page = $request->input('page', 1);

        $query = Patient::when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('phone_number', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%")
                ->orWhere('nik', 'like', "%{$search}%");
        })->latest();

        $data = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'data' => $data->items(),
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        return response()->json([
            'success' => true,
            'data' => $patient->load(['triages', 'treatments']),
        ]);
    }
}
