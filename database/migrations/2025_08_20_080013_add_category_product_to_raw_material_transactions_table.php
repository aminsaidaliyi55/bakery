<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('raw_material_transactions', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable()->after('raw_material_id');
            $table->unsignedBigInteger('product_id')->nullable()->after('category_id');

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('set null');

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('raw_material_transactions', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['product_id']);
            $table->dropColumn('category_id');
            $table->dropColumn('product_id');
        });
    }
};
