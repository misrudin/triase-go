<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TriageChecklist extends Model
{
    use HasFactory;

    protected $fillable = [
        'triage_id',
        'checklist_item_id',
        'checked',
    ];

     /**
     * Relasi ke Triage.
     * TriageChecklist belongs to a Triage.
     */
    public function triage()
    {
        return $this->belongsTo(Triage::class, 'triage_id');
    }

    /**
     * Relasi ke ChecklistItem.
     * TriageChecklist belongs to a ChecklistItem.
     */
    public function checklistItem()
    {
        return $this->belongsTo(ChecklistItem::class, 'checklist_item_id');
    }
}
