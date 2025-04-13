<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Organization;
use App\Models\OrgTimeSlot;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $org = Organization::factory()->create([
            'name' => 'Kasrath',
            'address' => 'KC Layout',
            'contact_number' => '9090909090',
            'email' => 'admin@admin.com',
        ]);

        OrgTimeSlot::factory()->create([
            'start_time' => '07:00:00',
            'end_time' => '08:00:00',
            'org_id' => $org->id,
        ]);
        OrgTimeSlot::factory()->create([
            'start_time' => '08:00:00',
            'end_time' => '09:00:00',
            'org_id' => $org->id,
        ]);
        OrgTimeSlot::factory()->create([
            'start_time' => '09:00:00',
            'end_time' => '10:00:00',
            'org_id' => $org->id,
        ]);
        OrgTimeSlot::factory()->create([
            'start_time' => '16:00:00',
            'end_time' => '17:00:00',
            'org_id' => $org->id,
        ]);
        OrgTimeSlot::factory()->create([
            'start_time' => '17:00:00',
            'end_time' => '18:00:00',
            'org_id' => $org->id,
        ]);
        OrgTimeSlot::factory()->create([
            'start_time' => '18:00:00',
            'end_time' => '19:00:00',
            'org_id' => $org->id,
        ]);

        Member::factory()->create([
            'name' => 'Naveen',
            'email' => 'admin@test.com',
            'password' => bcrypt('test'),
            'role' => 'admin',
            'org_id' => $org->id,
        ]);
    }
}
