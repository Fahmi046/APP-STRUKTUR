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
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('telepon')->nullable();
            $table->string('sumber')->nullable();
            $table->enum('status', ['prospect', 'contact', 'survey', 'negotiating', 'deal', 'cancelled'])->default('prospect');
            $table->string('marketing_pic')->nullable();
            $table->string('ktp')->nullable();
            $table->string('npwp')->nullable();
            $table->text('alamat')->nullable();
            $table->boolean('verified')->default(false);
            $table->string('jabatan')->nullable();
            $table->string('perusahaan')->nullable();
            $table->string('avatar')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
