<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Triage extends Model
{
    use HasFactory;

    protected $fillable = [
        'triage_no',
        'patient_id',
        'user_id',
        'allergy',
        'complaint',
        'status',
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
     * Relasi ke User.
     * Triage belongs to a User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
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

    public function painLocations()
    {
        return $this->hasMany(PainLocation::class);
    }

    protected static function booted()
    {
        static::creating(function ($triage) {
            $triage->triage_no = 'TRIAGE' . str_pad($triage->id, 4, '0', STR_PAD_LEFT);
        });
    }
}
