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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('bakery_id')->constrained('bakeries')->cascadeOnDelete();
            
            $table->string('role')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->date('hired_at')->nullable();
            $table->string('status')->default('active'); // e.g., active, terminated, on leave
            $table->text('notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
