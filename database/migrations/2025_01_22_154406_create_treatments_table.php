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
        Schema::create('treatments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('triage_id');
            $table->unsignedBigInteger('medical_staff_id');
            $table->string('treatment_details');
            $table->timestamps();

            $table->foreign('triage_id')->references('id')->on('triages')->onDelete('cascade');
            $table->foreign('medical_staff_id')->references('id')->on('medical_staff')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
