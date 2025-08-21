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
      Schema::create('employee_allowances', function (Blueprint $table) {
          $table->id();
          $table->foreignId('employee_id')->constrained()->cascadeOnDelete();
          $table->foreignId('bakery_id')->constrained()->cascadeOnDelete();
          $table->foreignId('manager_id')->constrained('users')->cascadeOnDelete();
          $table->decimal('amount', 15, 2);
          $table->date('allowance_date');
          $table->text('description')->nullable();
          $table->timestamps();
      });
  }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_allowances');
    }
};
