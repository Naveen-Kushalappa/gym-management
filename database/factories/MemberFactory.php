<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MemberFactory extends Factory{

     public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'gender' => 'Male',
            'is_active' => 'true',
        ];
    }

}