<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Karyawan>
 */
class KaryawanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'nip' => fake()->unique()->numerify('199######'),
            'jabatan' => fake()->randomElement(['Admin Gudang', 'Site Manager', 'Logistik', 'Finance', 'Project Manager']),
            'divisi' => fake()->randomElement(['Konstruksi', 'Operasional', 'Umum', 'SDM']),
            'email' => fake()->unique()->safeEmail(),
            'status' => fake()->randomElement(['Aktif', 'Cuti', 'Non-Aktif']),
            'avatar' => 'https://ui-avatars.com/api/?background=random&name=' . urlencode(fake()->name()),
        ];
    }
}
