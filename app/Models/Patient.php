<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nik',
        'gender',
        'date_of_birth',
        'address',
        'phone_number',
    ];

    /**
     * Relasi ke Triage.
     * Patient has many Triages.
     */
    public function triages()
    {
        return $this->hasMany(Triage::class, 'patient_id');
    }

    /**
     * Relasi ke Treatment.
     * Patient has many Treatments through Triages.
     */
    public function treatments()
    {
        return $this->hasManyThrough(Treatments::class, Triage::class, 'patient_id', 'triage_id');
    }
}
