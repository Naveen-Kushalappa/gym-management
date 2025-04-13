<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('org_time_slots', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('org_id')->nullable();
            $table->foreign('org_id')->references('id')->on('organizations')->onDelete('cascade');

            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('org_time_slots');
    }
};
