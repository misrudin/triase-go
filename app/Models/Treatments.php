<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatments extends Model
{
    use HasFactory;

    protected $fillable = [
        'triage_id',
        'medical_staff_id',
        'treatment_details',
    ];

        /**
     * Relasi ke Triage.
     * Treatment belongs to a Triage.
     */
    public function triage()
    {
        return $this->belongsTo(Triage::class, 'triage_id');
    }

    /**
     * Relasi ke MedicalStaff.
     * Treatment belongs to a MedicalStaff.
     */
    public function medicalStaff()
    {
        return $this->belongsTo(MedicalStaff::class, 'medical_staff_id');
    }
}
