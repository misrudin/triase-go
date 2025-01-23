<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('triage_checklists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('triage_id');
            $table->unsignedBigInteger('checklist_item_id');
            $table->boolean('checked');
            $table->timestamps();

            $table->foreign('triage_id')->references('id')->on('triages')->onDelete('cascade');

            $table->foreign('checklist_item_id')->references('id')->on('checklist_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('triage_checklists');
    }
};
