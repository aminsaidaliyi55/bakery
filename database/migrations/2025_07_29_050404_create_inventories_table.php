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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();

            // Foreign key linking to the bakeries table, cascade on delete
            $table->foreignId('bakery_id')->constrained()->cascadeOnDelete();

            // Foreign key linking to raw_materials table, nullable, set null on delete
            $table->foreignId('raw_material_id')->nullable()->constrained()->nullOnDelete();

            // Foreign key linking to products table, nullable, set null on delete
            $table->foreignId('product_id')->nullable()->constrained()->nullOnDelete();

            $table->integer('quantity')->default(0);
            $table->decimal('cost_per_unit', 10, 2)->nullable();
            $table->string('unit')->nullable(); // e.g., kg, liters, pieces
            $table->date('stocked_at')->nullable(); // date inventory was stocked
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
