<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treatments extends Model
{
    use HasFactory;

    protected $fillable = [
        'triage_id',
        'user_id',
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
     * Relasi ke User.
     * Treatment belongs to a User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
