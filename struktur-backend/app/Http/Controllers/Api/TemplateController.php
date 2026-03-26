<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return response()->json(Template::all(), 200);
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
      'nama' => 'required|string',
      'kategori' => 'nullable|string',
      'deskripsi' => 'nullable|string',
      'file' => 'required|file|mimes:pdf,docx,xlsx|max:10240',
      'versi' => 'nullable|string',
      'id_ref' => 'nullable|string|unique:templates',
      'tags' => 'nullable|string',
      'status' => 'nullable|in:Aktif,Update,Arsip',
      'uploaded_by' => 'nullable|string',
    ]);

    // Handle file upload if exists
    if ($request->hasFile('file')) {
      $file = $request->file('file');
      $filePath = $file->store('templates', 'public');
      $validated['file_path'] = $filePath;
      $validated['ukuran_file'] = number_format($file->getSize() / (1024 * 1024), 2) . ' MB';
      $validated['tipe_file'] = strtoupper($file->getClientOriginalExtension());
    }

    // Parse tags if it's a JSON string
    if (isset($validated['tags']) && is_string($validated['tags'])) {
      $validated['tags'] = json_decode($validated['tags'], true);
    }

    // Remove file from validated array since it's not a DB field
    unset($validated['file']);

    $template = Template::create($validated);

    return response()->json([
      'message' => 'Template berhasil ditambahkan',
      'data' => $template
    ], 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $template = Template::find($id);
    if (!$template) {
      return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
    return response()->json($template, 200);
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
    $template = Template::find($id);

    if (!$template) {
      return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }

    $validated = $request->validate([
      'nama' => 'sometimes|required|string',
      'kategori' => 'nullable|string',
      'deskripsi' => 'nullable|string',
      'file' => 'nullable|file|mimes:pdf,docx,xlsx|max:10240',
      'versi' => 'nullable|string',
      'id_ref' => 'nullable|string|unique:templates,id_ref,' . $id,
      'tags' => 'nullable|string',
      'status' => 'nullable|in:Aktif,Update,Arsip',
      'uploaded_by' => 'nullable|string',
    ]);

    // Handle file upload if exists
    if ($request->hasFile('file')) {
      // Delete old file
      if ($template->file_path) {
        \Storage::disk('public')->delete($template->file_path);
      }

      $file = $request->file('file');
      $filePath = $file->store('templates', 'public');
      $validated['file_path'] = $filePath;
      $validated['ukuran_file'] = number_format($file->getSize() / (1024 * 1024), 2) . ' MB';
      $validated['tipe_file'] = strtoupper($file->getClientOriginalExtension());
    }

    // Parse tags if it's a JSON string
    if (isset($validated['tags']) && is_string($validated['tags'])) {
      $validated['tags'] = json_decode($validated['tags'], true);
    }

    // Remove file from validated array since it's not a DB field
    unset($validated['file']);

    $template->update($validated);

    return response()->json([
      'message' => 'Template berhasil diupdate',
      'data' => $template
    ], 200);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    try {
      $template = Template::findOrFail($id);

      // Delete file if exists
      if ($template->file_path) {
        \Storage::disk('public')->delete($template->file_path);
      }

      $template->delete();

      return response()->json([
        'status' => 'success',
        'message' => 'Template berhasil dihapus'
      ], 200);
    } catch (\Exception $e) {
      return response()->json([
        'status' => 'error',
        'message' => $e->getMessage()
      ], 500);
    }
  }
}
