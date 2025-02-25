<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Umum',
            'Pernafasan',
            'Kondisi Jantung',
            'Pencernaan',
            'Saraf',
            'Mata',
            'Kulit',
            'Tulang & Sendi',
            'Infeksi',
            'Ginekologi',
            'Pediatri',
            'Psikiatri',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['name' => $category]);
        }
    }
}
