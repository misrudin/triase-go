<?php

namespace Database\Seeders;

use App\Models\TriageLevel;
use Illuminate\Database\Seeder;

class TriageLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TriageLevel::create([
            'level' => 'red',
            'description' => 'Kondisi yang mengancam jiwa dan memerlukan penanganan segera.',
        ]);

        TriageLevel::create([
            'level' => 'orange',
            'description' => 'Kondisi sangat serius yang berpotensi menjadi mengancam jiwa jika tidak segera ditangani.',
        ]);

        TriageLevel::create([
            'level' => 'yellow',
            'description' => 'Kondisi serius yang membutuhkan perhatian segera, namun tidak mengancam jiwa langsung.',
        ]);

        TriageLevel::create([
            'level' => 'green',
            'description' => 'Kondisi yang tidak mengancam jiwa, dapat menunggu untuk penanganan lebih lanjut.',
        ]);

        TriageLevel::create([
            'level' => 'black',
            'description' => 'Kondisi yang sangat parah atau telah meninggal, tidak ada harapan untuk diselamatkan.',
        ]);
    }
}
