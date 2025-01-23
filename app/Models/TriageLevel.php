<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TriageLevel extends Model
{
    use HasFactory;

    protected $fillable = [
        'level',
        'description',
    ];

    public function checklistItems()
    {
        return $this->hasMany(ChecklistItem::class, 'triage_level_id');
    }
}
