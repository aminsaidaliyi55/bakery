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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')->constrained('employees')->cascadeOnDelete();

            $table->date('date');
            $table->enum('status', ['present', 'absent', 'leave', 'late', 'excused'])->default('present');

            $table->time('check_in_time')->nullable();
            $table->time('check_out_time')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->unique(['employee_id', 'date']); // prevent duplicate attendance per day per employee
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
