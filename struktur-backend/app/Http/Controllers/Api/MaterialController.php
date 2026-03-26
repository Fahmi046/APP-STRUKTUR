<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Material::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'kategori' => 'nullable',
            'merk' => 'nullable',
            'tipe' => 'nullable',
            'harga' => 'nullable|numeric',
            'satuan' => 'nullable',
            'stok' => 'nullable|integer',
            'min_stok' => 'nullable|integer',
            'vendor' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('materials', 'public');
            $data['image'] = $imagePath;
        }

        $material = Material::create($data);
        return response()->json($material, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }
        return response()->json($material, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $material = Material::find($id);

        if (!$material) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => 'sometimes|required',
            'kategori' => 'nullable',
            'merk' => 'nullable',
            'tipe' => 'nullable',
            'harga' => 'nullable|numeric',
            'satuan' => 'nullable',
            'stok' => 'nullable|integer',
            'min_stok' => 'nullable|integer',
            'vendor' => 'nullable',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($material->image) {
                \Storage::disk('public')->delete($material->image);
            }

            $image = $request->file('image');
            $imagePath = $image->store('materials', 'public');
            $data['image'] = $imagePath;
        }

        $material->update($data);

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $material
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $material = Material::findOrFail($id);

            // Delete image if exists
            if ($material->image) {
                \Storage::disk('public')->delete($material->image);
            }

            $material->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Data berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
