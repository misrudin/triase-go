<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Triage extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'medical_staff_id',
    ];

    /**
     * Relasi ke Patient.
     * Triage belongs to a Patient.
     */
    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }

    /**
     * Relasi ke MedicalStaff.
     * Triage belongs to a MedicalStaff.
     */
    public function medicalStaff()
    {
        return $this->belongsTo(MedicalStaff::class, 'medical_staff_id');
    }

    /**
     * Relasi ke Treatment.
     * Triage has many Treatments.
     */
    public function treatments()
    {
        return $this->hasMany(Treatments::class, 'triage_id');
    }

    /**
     * Relasi ke TriageChecklist.
     * Triage has many TriageChecklists.
     */
    public function triageChecklists()
    {
        return $this->hasMany(TriageChecklist::class, 'triage_id');
    }
}
