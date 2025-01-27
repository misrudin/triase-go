<?php

namespace App\Http\Controllers;

use App\Models\MedicalStaff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MedicalStaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $triageLevels = MedicalStaff::when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('role', 'like', "%{$search}%")
                ->orWhere('department', 'like', "%{$search}%")
                ->orWhere('phone_number', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        })->latest()->get();

        return Inertia::render('Admin/MedicalStaff', [
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
            'name' => 'required|string|max:255',
            'staff_id' => 'required|string|max:100|unique:medical_staff,staff_id',
            'role' => 'required|string|max:100',
            'department' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:medical_staff,email',
            'phone_number' => 'required|string|max:20|unique:medical_staff,phone_number',
            'address' => 'required|string|max:255',
        ]);

        try {
            MedicalStaff::create($validatedData);

            return redirect()->back()->with('success', 'Medical Staff created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MedicalStaff $medicalStaff)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MedicalStaff $medicalStaff)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MedicalStaff $medicalStaff)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'staff_id' => "required|string|max:100|unique:medical_staff,staff_id,{$medicalStaff->id}",
            'role' => 'required|string|max:100',
            'department' => 'required|string|max:100',
            'email' => "required|email|max:255|unique:medical_staff,email,{$medicalStaff->id}",
            'phone_number' => "required|string|max:20|unique:medical_staff,phone_number,{$medicalStaff->id}",
            'address' => 'required|string|max:255',
        ]);

        try {
            $medicalStaff->update($validatedData);

            return redirect()->back()->with('success', 'Medical Staff created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MedicalStaff $medicalStaff)
    {
        try {
            $medicalStaff->delete();
            return redirect()->back()->with('success', 'Medical Staff deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete Medical Staff: ' . $e->getMessage());
        }
    }
}
