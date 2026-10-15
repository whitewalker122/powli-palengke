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
        Schema::table('users', function (Blueprint $table) {
            // Siguraduhing hindi mauulit kung meron na man
            if (!Schema::hasColumn('users', 'store_name')) {
                $table->string('store_name')->nullable();
            }
            if (!Schema::hasColumn('users', 'store_address')) {
                $table->text('store_address')->nullable();
            }
            if (!Schema::hasColumn('users', 'application_status')) {
                $table->string('application_status')->default('pending');
            }
            if (!Schema::hasColumn('users', 'is_profile_complete')) {
                $table->boolean('is_profile_complete')->default(false);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'store_name',
                'store_address',
                'application_status',
                'is_profile_complete',
            ]);
        });
    }
};