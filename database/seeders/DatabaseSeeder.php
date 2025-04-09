<?php

namespace Database\Seeders;

use App\Models\Member;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Member::factory()->create([
            'name' => 'Naveen',
            'email' => 'admin@test.com',
            'password' => bcrypt('test'),
            'role' => 'admin',
        ]);
    }
}
