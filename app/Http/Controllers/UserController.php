<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of users with pagination and search.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('length', 10);
        $page = $request->input('page', 1);

        $query = User::where('id', '!=', auth()->id())
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('department', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('role', 'like', "%{$search}%");
                });
            })->latest();

        $users = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'success' => true,
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ]
        ]);
    }

    /**
     * Show a single user.
     */
    public function show(User $user)
    {
        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Store a new user.
     */
    public function store(Request $request)
    {
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

        $validatedData['password'] = Hash::make($validatedData['password']);

        try {
            $user = User::create($validatedData);
            return response()->json([
                'success' => true,
                'message' => 'User created successfully!',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update an existing user.
     */
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
            return response()->json([
                'success' => true,
                'message' => 'User updated successfully!',
                'data' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a user.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully!',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
