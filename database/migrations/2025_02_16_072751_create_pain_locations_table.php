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
        Schema::create('pain_locations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('triage_id');
            $table->decimal('x', 8, 2);
            $table->decimal('y', 8, 2);
            $table->string('name');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->foreign('triage_id')->references('id')->on('triages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pain_locations');
    }
};
