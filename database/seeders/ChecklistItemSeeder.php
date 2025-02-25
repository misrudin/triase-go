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
        $checklistItems = [
            // Level 1 - Kondisi Darurat
            ['triage_level_id' => 1, 'category_id' => 1, 'name' => 'Perdarahan berat', 'description' => 'Pasien mengalami perdarahan yang tidak dapat dihentikan atau perdarahan internal yang parah.'],
            ['triage_level_id' => 1, 'category_id' => 2, 'name' => 'Sesak napas akut', 'description' => 'Pasien kesulitan bernapas dengan tanda-tanda kegagalan pernapasan.'],
            ['triage_level_id' => 1, 'category_id' => 3, 'name' => 'Serangan jantung', 'description' => 'Nyeri dada yang parah disertai sesak napas dan kelemahan ekstrem.'],
            ['triage_level_id' => 1, 'category_id' => 1, 'name' => 'Kejang berulang', 'description' => 'Kejang berlangsung lebih dari 5 menit atau kejang terjadi secara terus-menerus.'],
            ['triage_level_id' => 1, 'category_id' => 4, 'name' => 'Syok anafilaksis', 'description' => 'Reaksi alergi berat yang mengancam jiwa dengan sesak napas dan tekanan darah turun drastis.'],

            // Level 2 - Kondisi Serius
            ['triage_level_id' => 2, 'category_id' => 2, 'name' => 'Nyeri dada', 'description' => 'Pasien merasakan nyeri dada yang berpotensi terkait serangan jantung.'],
            ['triage_level_id' => 2, 'category_id' => 1, 'name' => 'Cedera kepala parah', 'description' => 'Trauma kepala dengan kehilangan kesadaran atau muntah berulang.'],
            ['triage_level_id' => 2, 'category_id' => 3, 'name' => 'Gangguan irama jantung', 'description' => 'Aritmia berat yang berpotensi menyebabkan henti jantung.'],
            ['triage_level_id' => 2, 'category_id' => 5, 'name' => 'Fraktur terbuka', 'description' => 'Tulang patah dengan bagian yang terlihat keluar dari kulit.'],
            ['triage_level_id' => 2, 'category_id' => 6, 'name' => 'Hipoglikemia berat', 'description' => 'Gula darah sangat rendah yang menyebabkan kebingungan atau kehilangan kesadaran.'],

            // Level 3 - Kondisi Sedang
            ['triage_level_id' => 3, 'category_id' => 1, 'name' => 'Luka ringan', 'description' => 'Pasien mengalami luka kecil atau goresan yang tidak mengancam jiwa.'],
            ['triage_level_id' => 3, 'category_id' => 2, 'name' => 'Asma ringan', 'description' => 'Sesak napas yang dapat dikendalikan dengan inhaler atau obat lain.'],
            ['triage_level_id' => 3, 'category_id' => 5, 'name' => 'Patah tulang tertutup', 'description' => 'Fraktur yang tidak menembus kulit dan tidak menyebabkan deformitas parah.'],
            ['triage_level_id' => 3, 'category_id' => 4, 'name' => 'Infeksi saluran kemih', 'description' => 'Nyeri atau rasa terbakar saat buang air kecil dengan demam ringan.'],
            ['triage_level_id' => 3, 'category_id' => 7, 'name' => 'Radang tenggorokan', 'description' => 'Nyeri tenggorokan akibat infeksi ringan atau virus.'],

            // Level 4 - Kondisi Tidak Darurat
            ['triage_level_id' => 4, 'category_id' => 1, 'name' => 'Mual atau muntah ringan', 'description' => 'Mual atau muntah tanpa tanda dehidrasi atau komplikasi lainnya.'],
            ['triage_level_id' => 4, 'category_id' => 2, 'name' => 'Alergi ringan', 'description' => 'Ruam atau gatal-gatal tanpa gangguan pernapasan.'],
            ['triage_level_id' => 4, 'category_id' => 3, 'name' => 'Hipertensi ringan', 'description' => 'Tekanan darah tinggi tanpa gejala yang mengancam jiwa.'],
            ['triage_level_id' => 4, 'category_id' => 6, 'name' => 'Nyeri punggung kronis', 'description' => 'Nyeri punggung yang sudah berlangsung lama tanpa keluhan baru.'],
            ['triage_level_id' => 4, 'category_id' => 8, 'name' => 'Flu biasa', 'description' => 'Hidung tersumbat, batuk ringan, dan sedikit demam.'],

            // Level 5 - Tidak Memerlukan Perawatan Mendesak
            ['triage_level_id' => 5, 'category_id' => 1, 'name' => 'Kondisi terminal', 'description' => 'Pasien dalam kondisi sangat kritis tanpa kemungkinan pemulihan.'],
            ['triage_level_id' => 5, 'category_id' => 2, 'name' => 'Kematian', 'description' => 'Pasien telah meninggal sebelum tiba di fasilitas medis.'],
            ['triage_level_id' => 5, 'category_id' => 9, 'name' => 'Pemeriksaan kesehatan rutin', 'description' => 'Kunjungan ke rumah sakit untuk pemeriksaan berkala tanpa keluhan akut.'],
            ['triage_level_id' => 5, 'category_id' => 10, 'name' => 'Permintaan obat ulang', 'description' => 'Pasien datang untuk mengambil resep ulang tanpa gejala baru.'],
            ['triage_level_id' => 5, 'category_id' => 11, 'name' => 'Konsultasi psikologis', 'description' => 'Pasien membutuhkan layanan psikolog tanpa kondisi medis darurat.'],
        ];

        foreach ($checklistItems as $item) {
            ChecklistItem::firstOrCreate([
                'triage_level_id' => $item['triage_level_id'],
                'category_id' => $item['category_id'],
                'name' => $item['name'],
            ], [
                'description' => $item['description'],
            ]);
        }
    }
}
