<?php

namespace Database\Seeders;

use App\Models\TriageLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TriageLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TriageLevel::create([
            'level' => 'Red',
            'description' => 'Kondisi yang mengancam jiwa dan memerlukan penanganan segera.',
        ]);

        TriageLevel::create([
            'level' => 'Yellow',
            'description' => 'Kondisi serius yang membutuhkan perhatian segera, namun tidak mengancam jiwa langsung.',
        ]);

        TriageLevel::create([
            'level' => 'Green',
            'description' => 'Kondisi yang tidak mengancam jiwa, dapat menunggu untuk penanganan lebih lanjut.',
        ]);

        TriageLevel::create([
            'level' => 'Black',
            'description' => 'Kondisi yang sangat parah atau telah meninggal, tidak ada harapan untuk diselamatkan.',
        ]);
    }
}
