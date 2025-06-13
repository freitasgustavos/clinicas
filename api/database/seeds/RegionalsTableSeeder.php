<?php

use Illuminate\Database\Seeder;

class RegionalsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('regionals')->insert([
            ['label' => 'Alto tietê'], ['label' => 'Interior'], ['label' => 'ES'],
            ['label' => 'SP Interior'], ['label' => 'SP'], ['label' => 'SP2'],
            ['label' => 'MG'], ['label' => 'Nacional'], ['label' => 'SP CAV'],
            ['label' => 'RJ'], ['label' => 'SP1'], ['label' => 'NE1'],
            ['label' => 'NE2'], ['label' => 'SUL'], ['label' => 'Norte'],
        ]);
    }
}
