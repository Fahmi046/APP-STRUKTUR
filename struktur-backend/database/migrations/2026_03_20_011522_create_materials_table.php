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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kategori')->nullable();
            $table->string('merk')->nullable();
            $table->string('tipe')->nullable();
            $table->decimal('harga', 15, 2)->nullable();
            $table->string('satuan')->default('pcs');
            $table->integer('stok')->default(0);
            $table->integer('min_stok')->default(5);
            $table->string('vendor')->nullable();
            $table->string('image')->nullable();
            $table->enum('status', ['Aktif', 'Non-Aktif'])->default('Aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
