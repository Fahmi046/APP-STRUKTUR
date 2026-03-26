<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Client::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'telepon' => 'nullable|string|max:20',
            'sumber' => 'nullable|string|max:255',
            'status' => 'nullable|in:prospect,contact,survey,negotiating,deal,cancelled',
            'marketing_pic' => 'nullable|string|max:255',
            'ktp' => 'nullable|string|max:20',
            'npwp' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'jabatan' => 'nullable|string|max:255',
            'perusahaan' => 'nullable|string|max:255',
            'avatar' => 'nullable|string',
            'verified' => 'nullable|boolean'
        ]);

        $client = Client::create($validated);
        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client tidak ditemukan'], 404);
        }
        return response()->json($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:clients,email,' . $id,
            'telepon' => 'nullable|string|max:20',
            'sumber' => 'nullable|string|max:255',
            'status' => 'nullable|in:prospect,contact,survey,negotiating,deal,cancelled',
            'marketing_pic' => 'nullable|string|max:255',
            'ktp' => 'nullable|string|max:20',
            'npwp' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'jabatan' => 'nullable|string|max:255',
            'perusahaan' => 'nullable|string|max:255',
            'avatar' => 'nullable|string',
            'verified' => 'nullable|boolean'
        ]);

        $client->update($validated);
        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::find($id);
        if (!$client) {
            return response()->json(['message' => 'Client tidak ditemukan'], 404);
        }

        $client->delete();
        return response()->json(['message' => 'Client berhasil dihapus']);
    }
}
