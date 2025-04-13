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
        Schema::table('members', function (Blueprint $table) {
            $table->uuid('org_time_slot_id')->nullable();
            $table->foreign('org_time_slot_id')->references('id')->on('org_time_slots')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropForeign('members_org_time_slot_id_foreign');
            $table->dropColumn('org_time_slot_id');
        });
    }
};
