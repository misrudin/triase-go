<?php

namespace Database\Seeders;

use App\Models\ChecklistItem;
use Illuminate\Database\Seeder;

class ChecklistItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ChecklistItem::create([
            'triage_level_id' => 1,
            'category_id' => 1,
            'name' => 'Perdarahan berat',
            'description' => 'Pasien mengalami perdarahan yang tidak dapat dihentikan atau perdarahan internal yang parah.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 1,
            'category_id' => 2,
            'name' => 'Sesak napas',
            'description' => 'Pasien kesulitan bernapas, dengan tanda-tanda hipoksia atau kegagalan pernapasan.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 2,
            'category_id' => 2,
            'name' => 'Nyeri dada',
            'description' => 'Pasien merasakan nyeri dada yang intens, berisiko terkena serangan jantung atau kondisi jantung lainnya.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 2,
            'category_id' => 1,
            'name' => 'Kejang',
            'description' => 'Pasien mengalami kejang yang berlangsung lebih dari 5 menit atau kejang berulang.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 3,
            'category_id' => 1,
            'name' => 'Luka ringan',
            'description' => 'Pasien mengalami luka kecil atau goresan yang tidak mengancam jiwa.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 3,
            'category_id' => 1,
            'name' => 'Mual atau muntah ringan',
            'description' => 'Pasien mengeluhkan rasa mual atau muntah yang tidak berbahaya atau terkait dengan kondisi ringan.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 4,
            'category_id' => 2,
            'name' => 'Kondisi terminal',
            'description' => 'Pasien dalam kondisi yang sangat kritis dan tidak ada harapan untuk bertahan hidup.',
        ]);

        ChecklistItem::create([
            'triage_level_id' => 4,
            'category_id' => 2,
            'name' => 'Kematian',
            'description' => 'Pasien sudah meninggal atau tidak ada tanda kehidupan yang dapat diselamatkan.',
        ]);
    }
}
