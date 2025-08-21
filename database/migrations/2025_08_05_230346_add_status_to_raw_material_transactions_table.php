<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('raw_material_transactions', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending')->after('transaction_type');
        });
    }

    public function down(): void
    {
        Schema::table('raw_material_transactions', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
