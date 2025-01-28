<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    // Index Method: Menampilkan daftar pengguna
    public function index(Request $request)
    {
        $search = $request->input('search');

        $data = User::where('id', '!=', auth()->id())
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('department', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('role', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Admin/Users', [
            'data' => $data,
            'filters' => [
                'search' => $search
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Validasi data input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:3|confirmed',
            'role' => 'required|string|max:100',
            'staff_id' => 'required|string|max:100|unique:medical_staff,staff_id',
            'department' => 'required|string|max:100',
            'phone_number' => 'required|string|max:20|unique:medical_staff,phone_number',
            'address' => 'required|string|max:255',
        ]);

        // Hash password
        $validatedData['password'] = Hash::make($validatedData['password']);


        try {
            User::create($validatedData);

            return redirect()->back()->with('success', 'User created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:100',
            'department' => 'required|string|max:100',
            'email' => "required|email|max:255|unique:users,email,{$user->id}",
            'phone_number' => "required|string|max:20|unique:users,phone_number,{$user->id}",
            'address' => 'required|string|max:255',
        ]);


        try {
            $user->update($validatedData);

            return redirect()->back()->with('success', 'User created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->back()->with('success', 'User deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete User: ' . $e->getMessage());
        }
    }
}
