<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PainLocation extends Model
{
    use HasFactory;
    protected $fillable = ['triage_id', 'x', 'y', 'name', 'notes'];

    public function triage()
    {
        return $this->belongsTo(Triage::class);
    }
}
