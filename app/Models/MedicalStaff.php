<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalStaff extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'staff_id',
        'role',
        'department',
        'email',
        'phone_number',
        'address',
    ];

        /**
     * Relasi ke Triage.
     * MedicalStaff has many Triages.
     */
    public function triages()
    {
        return $this->hasMany(Triage::class, 'medical_staff_id');
    }

    /**
     * Relasi ke Treatment.
     * MedicalStaff has many Treatments.
     */
    public function treatments()
    {
        return $this->hasMany(Treatments::class, 'medical_staff_id');
    }
}
