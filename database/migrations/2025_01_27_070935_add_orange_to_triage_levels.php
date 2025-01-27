<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('triage_levels', function (Blueprint $table) {
            DB::statement("ALTER TABLE triage_levels MODIFY COLUMN level ENUM('red', 'yellow', 'green', 'black', 'orange') NOT NULL");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('triage_levels', function (Blueprint $table) {
            //
            DB::statement("ALTER TABLE triage_levels MODIFY COLUMN level ENUM('red', 'yellow', 'green', 'black') NOT NULL");
        });
    }
};
