<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'triage_level_id',
        'name',
        'description',
    ];

    public function triageLevel()
    {
        return $this->belongsTo(TriageLevel::class, 'triage_level_id');
    }
}
