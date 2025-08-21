<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bakery_product', function (Blueprint $table) {
            $table->unsignedBigInteger('bakery_id');
            $table->unsignedBigInteger('product_id');
            $table->timestamps();

            $table->primary(['bakery_id', 'product_id']);

            $table->foreign('bakery_id')->references('id')->on('bakeries')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bakery_product');
    }
};
