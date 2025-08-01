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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->cascadeOnDelete();
            $table->string('contract_type')->nullable(); // e.g., full-time, part-time, temporary
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->text('terms')->nullable();
            $table->string('status')->default('active'); // active, expired, terminated
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
