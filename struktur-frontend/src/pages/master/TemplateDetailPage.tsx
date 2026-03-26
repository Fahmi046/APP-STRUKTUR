import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTemplateDetail,
  deleteTemplate,
  updateTemplate,
} from "../../api/templateService";
import toast from "react-hot-toast";
import BottomNav from "../../components/BottomNav";

interface ITemplate {
  id: string;
  nama: string;
  kategori: string;
  deskripsi: string;
  file_path: string;
  ukuran_file: string;
  tipe_file: string;
  versi: string;
  id_ref: string;
  tags: string[];
  status: string;
  uploaded_by: string;
  updated_at: string;
}

const TemplateDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newFile, setNewFile] = useState<File | null>(null);

  // Fetch template detail
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getTemplateDetail(id as string);
        setTemplate(data);
      } catch (error) {
        console.error("Error loading template:", error);
        toast.error("Gagal memuat template");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Jika data tidak ditemukan
  if (loading) {
    return (
      <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center text-slate-500 p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <p>Mengambil data template...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center text-slate-500 p-6 text-center">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-20">
          description
        </span>
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

  const handleDelete = async () => {
    try {
      await deleteTemplate(id as string);
      toast.success("Template berhasil dihapus!");
      setIsDeleteModalOpen(false);
      navigate("/master/template");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Gagal menghapus template");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFile(e.target.files[0]);
    }
  };

  const handlePreview = () => {
    if (template.file_path) {
      const fileUrl = `http://127.0.0.1:8000/storage/${template.file_path}`;
      window.open(fileUrl, "_blank");
    }
  };

  const handleDownload = async () => {
    if (template.file_path) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/storage/${template.file_path}`,
        );
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = template.nama;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success("File berhasil diunduh!");
      } catch {
        toast.error("Gagal mengunduh file");
      }
    }
  };

  const handleUpdateFile = async () => {
    if (!newFile) {
      toast.error("Pilih file terlebih dahulu");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("_method", "PUT");

      await updateTemplate(id as string, formData);
      toast.success("File berhasil diperbarui!");
      setNewFile(null);

      // Reload template
      const data = await getTemplateDetail(id as string);
      setTemplate(data);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Gagal memperbarui file");
    }
  };

  return (
    <>
      <div className="bg-background-dark min-h-screen text-slate-100 font-display antialiased pb-32">
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-border-dark/50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-surface-dark rounded-full transition-colors active:scale-90"
            >
              <span className="material-symbols-outlined">arrow_back</span>
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
              <span className="material-symbols-outlined">share</span>
            </button>
            <button
              onClick={() => navigate(`/master/template/edit/${id}`)}
              className="p-2 hover:bg-surface-dark rounded-full transition-colors text-primary"
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        </header>

        <main className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
          {/* PREVIEW SECTION */}
          <section className="flex flex-col items-center text-center">
            <div
              onClick={handlePreview}
              className="w-full max-w-[180px] aspect-[3/4] bg-surface-dark rounded-2xl shadow-2xl border border-border-dark mb-6 flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-primary/50 transition-all"
            >
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary/40 text-6xl mb-2 group-hover:text-primary/60 transition-colors">
                  description
                </span>
                <span className="text-[10px] font-black bg-red-500 px-2 py-0.5 rounded text-white">
                  {template.tipe_file || "FILE"}
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
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  Update:{" "}
                  {new Date(template.updated_at).toLocaleDateString("id-ID")}
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
              <p className="text-sm font-bold text-slate-200">
                {template.ukuran_file}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
                Tipe File
              </p>
              <p className="text-sm font-bold text-slate-200 uppercase">
                {template.tipe_file}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
                Versi
              </p>
              <div className=" flex items-center gap-1.5 text-green-500">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <p className="text-sm font-bold">{template.versi}</p>
              </div>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1">
                Diupload oleh
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {template.uploaded_by?.[0]?.toUpperCase() || "U"}
                </div>
                <p className="text-xs font-bold text-slate-300">
                  {template.uploaded_by || "Admin"}
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
              {template.deskripsi || "Tidak ada deskripsi"}
            </p>
          </section>

          {/* TAGS */}
          {template.tags && template.tags.length > 0 && (
            <section className="bg-surface-dark/50 rounded-3xl p-6 border border-border-dark text-left">
              <h3 className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-3">
                Kategori Terkait
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-background-dark text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-border-dark"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* UPDATE FILE SECTION */}
          {newFile && (
            <section className="bg-orange-500/10 rounded-3xl p-6 border border-orange-500/20 text-left">
              <h3 className="text-orange-400 text-[10px] uppercase tracking-widest font-black mb-3">
                File Pengganti
              </h3>
              <p className="text-sm font-bold text-orange-300 mb-4">
                {newFile.name}
              </p>
              <button
                onClick={handleUpdateFile}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-xl transition-all"
              >
                Upload File Baru
              </button>
            </section>
          )}

          {/* ACTIONS */}
          <section className="space-y-3 pt-4">
            <button
              onClick={handleDownload}
              className="w-full bg-primary hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">download</span>
              DOWNLOAD TEMPLATE
            </button>
            <div className="grid grid-cols-2 gap-3">
              <label className="w-full bg-surface-dark border border-border-dark text-slate-400 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer hover:bg-surface-dark/80 transition-colors">
                <span className="material-symbols-outlined text-sm">
                  upload_file
                </span>
                Ganti File
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.xlsx"
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="w-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] hover:bg-red-500/20 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>
                Hapus
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
                  <span className="material-symbols-outlined text-5xl">
                    error_outline
                  </span>
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
                  className="w-full py-4 rounded-2xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full py-4 rounded-2xl font-bold bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </>
  );
};

export default TemplateDetailPage;
