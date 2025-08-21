<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('pastry_categories', function (Blueprint $table) {
            $table->uuid('uuid')->unique()->after('id');
            $table->foreignId('bakery_id')->nullable()->constrained()->onDelete('set null');
            $table->string('unit')->default('kg');
            $table->string('image_path')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('pastry_categories', function (Blueprint $table) {
            $table->dropColumn('uuid');
            $table->dropForeign(['bakery_id']);
            $table->dropColumn('bakery_id');
            $table->dropColumn('unit');
            $table->dropColumn('image_path');
            $table->dropColumn('is_active');
        });
    }
};

