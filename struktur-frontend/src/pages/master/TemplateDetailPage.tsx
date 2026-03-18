import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// IMPORT DATA DARI STORE
import { MOCK_TEMPLATES } from "../../data/templateStore";

import {
  ArrowLeft,
  Pencil,
  Download,
  FileText,
  Trash2,
  History,
  ShieldCheck,
  Share2,
  AlertTriangle,
} from "lucide-react";

const TemplateDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // MENCARI DATA BERDASARKAN ID (Konversi ke Number)
  const template = MOCK_TEMPLATES.find((t) => t.id === Number(id));

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Jika data tidak ditemukan
  if (!template) {
    return (
      <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center text-slate-500 p-6 text-center">
        <FileText size={64} className="mb-4 opacity-20" />
        <h2 className="text-xl font-bold text-white mb-2">
          Template Tidak Ditemukan
        </h2>
        <p className="text-sm mb-6">Dokumen dengan ID #{id} tidak tersedia.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold active:scale-95 transition-all"
        >
          Kembali ke Gallery
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    console.log("Menghapus file:", template.nama);
    // Logika API delete di sini
    setIsDeleteModalOpen(false);
    navigate("/master/templates");
  };

  return (
    <div className="bg-background-dark min-h-screen text-slate-100 font-display antialiased pb-32">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-border-dark/50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-surface-dark rounded-full transition-colors active:scale-90"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="text-left">
            <h1 className="text-lg font-bold tracking-tight">
              Detail Template
            </h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">
              Dokumen {template.kategori}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-surface-dark rounded-full transition-colors text-slate-400">
            <Share2 size={20} />
          </button>
          <button className="p-2 hover:bg-surface-dark rounded-full transition-colors text-primary">
            <Pencil size={20} />
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
        {/* PREVIEW SECTION */}
        <section className="flex flex-col items-center text-center">
          <div className="w-full max-w-[180px] aspect-[3/4] bg-surface-dark rounded-2xl shadow-2xl border border-border-dark mb-6 flex items-center justify-center overflow-hidden relative group">
            <div className="flex flex-col items-center">
              <FileText size={64} className="text-primary/40 mb-2" />
              <span className="text-[10px] font-black bg-red-500 px-2 py-0.5 rounded text-white">
                {template.nama.split(".").pop()?.toUpperCase()}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                Preview Dokumen
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold px-4 leading-tight">
              {template.nama}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 items-center">
              <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full border border-primary/20 tracking-widest uppercase">
                {template.kategori}
              </span>
              <span className="text-slate-500 text-xs flex items-center gap-1">
                <History size={14} />
                Update: {template.tgl_update}
              </span>
            </div>
          </div>
        </section>

        {/* FILE INFO GRID */}
        <section className="bg-surface-dark/50 rounded-3xl p-6 border border-border-dark grid grid-cols-2 gap-y-6 shadow-inner text-left">
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
              Ukuran File
            </p>
            <p className="text-sm font-bold text-slate-200">{template.size}</p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
              Tipe File
            </p>
            <p className="text-sm font-bold text-slate-200 uppercase">
              {template.tipe}
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
              Versi
            </p>
            <div className="flex items-center gap-1.5 text-green-500">
              <ShieldCheck size={14} />
              <p className="text-sm font-bold">{template.versi}</p>
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
              Diupload oleh
            </p>
            <div className="flex items-center gap-2 mt-1">
              <img
                alt="Avatar"
                className="w-5 h-5 rounded-full ring-1 ring-border-dark"
                src={template.avatar}
              />
              <p className="text-xs font-bold text-slate-300">
                {template.uploader}
              </p>
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="bg-surface-dark/50 rounded-3xl p-6 border border-border-dark text-left">
          <h3 className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-3">
            Deskripsi Dokumen
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            {template.deskripsi}
          </p>
        </section>

        {/* TAGS */}
        <section className="bg-surface-dark/50 rounded-3xl p-6 border border-border-dark text-left">
          <h3 className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-3">
            Kategori Terkait
          </h3>
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="bg-background-dark text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-border-dark"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* ACTIONS */}
        <section className="space-y-3 pt-4">
          <button className="w-full bg-primary hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
            <Download size={20} />
            DOWNLOAD TEMPLATE
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="w-full bg-surface-dark border border-border-dark text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98]">
              <Pencil size={16} className="text-slate-400" /> Edit
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </section>
      </main>

      {/* MODAL HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-sm bg-[#161B26] rounded-3xl p-6 shadow-2xl border border-white/5 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 ring-8 ring-red-500/5">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Hapus Dokumen?
              </h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed px-2">
                Dokumen <b>{template.nama}</b> akan dihapus secara permanen.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-10">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-4 rounded-2xl font-bold bg-slate-800 text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-4 rounded-2xl font-bold bg-red-500 text-white shadow-lg shadow-red-500/30"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDetailPage;
