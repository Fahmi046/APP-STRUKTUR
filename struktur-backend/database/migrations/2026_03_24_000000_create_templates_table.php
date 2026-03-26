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
    Schema::create('templates', function (Blueprint $table) {
      $table->id();
      $table->string('nama');
      $table->string('kategori')->nullable();
      $table->text('deskripsi')->nullable();
      $table->string('file_path');
      $table->string('ukuran_file')->nullable();
      $table->string('tipe_file')->nullable();
      $table->string('versi')->default('v1.0.0');
      $table->string('id_ref')->nullable()->unique();
      $table->json('tags')->nullable();
      $table->enum('status', ['Aktif', 'Update', 'Arsip'])->default('Aktif');
      $table->string('uploaded_by')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('templates');
  }
};
