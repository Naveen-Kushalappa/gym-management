<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Member;
use Illuminate\Support\Facades\Log;

class MemberTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $this->assertTrue(true);
    }

    public function test_for_member_creation(): void{
        // $member = new Member(['name' => 'Naveen', 'gender' => 'Male', 'is_active' => true ]);
        $member = Member::factory()->create(['name' => 'Naveen', 'gender' => 'Male', 'is_active' => true ]);
        Log::info($member);
        $exists = Member::where('name', 'Naveen')->exists();
        $this->assertTrue($exists, 'This member does not exist in DB');
    }
}
