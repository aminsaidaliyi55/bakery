<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up()
  {
      Schema::create('raw_material_transactions', function (Blueprint $table) {
          $table->id();
          $table->foreignId('bakery_id')->constrained()->onDelete('cascade');
          $table->foreignId('raw_material_id')->constrained()->onDelete('cascade');
          $table->foreignId('user_id')->constrained()->onDelete('cascade');
          $table->string('role'); // owner, dough_mixer, etc.
          $table->decimal('quantity', 12, 3); // can be negative
          $table->string('measurement_unit'); // e.g., kg, liters
          $table->enum('transaction_type', ['supply', 'use', 'transfer']);
          $table->timestamps();
      });
  }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raw_material_transactions');
    }
};
