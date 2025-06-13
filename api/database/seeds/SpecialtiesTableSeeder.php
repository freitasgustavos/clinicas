<?php

use Illuminate\Database\Seeder;

class SpecialtiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('specialties')->insert([
            ['label' => 'Cardiologia'], ['label' => 'Dermatologia'], ['label' => 'Ginecologia'],
            ['label' => 'Ortopedia'], ['label' => 'Pediatria'], ['label' => 'Psiquiatria'],
            ['label' => 'Urologia'], ['label' => 'Oftalmologia'],
        ]);
    }
}
