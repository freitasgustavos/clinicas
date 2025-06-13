<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@amorsaude.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('mudar@123'),
            ]
        );
    }
}
