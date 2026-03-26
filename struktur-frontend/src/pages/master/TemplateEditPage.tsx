import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTemplateDetail, updateTemplate } from "../../api/templateService";
import toast from "react-hot-toast";
import BottomNav from "../../components/BottomNav";

interface FormData {
  nama: string;
  kategori: string;
  deskripsi: string;
  versi: string;
  id_ref: string;
  tags: string[];
}

interface ITemplate extends FormData {
  id: string;
  file_path: string;
  ukuran_file: string;
  tipe_file: string;
  status: string;
  uploaded_by: string;
  updated_at: string;
}

const TemplateEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [form, setForm] = useState<FormData>({
    nama: "",
    kategori: "",
    deskripsi: "",
    versi: "",
    id_ref: "",
    tags: [],
  });
  const [newFile, setNewFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState("");

  // Fetch template data
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setLoading(true);
        const data = await getTemplateDetail(id as string);
        setTemplate(data);
        setForm({
          nama: data.nama,
          kategori: data.kategori,
          deskripsi: data.deskripsi,
          versi: data.versi,
          id_ref: data.id_ref,
          tags: data.tags || [],
        });
      } catch (error) {
        console.error("Error loading template:", error);
        toast.error("Gagal memuat template");
        navigate("/master/template");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Hanya file PDF, DOCX, atau XLSX yang diizinkan");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file tidak boleh melebihi 5MB");
        return;
      }
      setNewFile(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!form.nama.trim()) {
      toast.error("Nama template tidak boleh kosong");
      return;
    }
    if (!form.kategori.trim()) {
      toast.error("Kategori tidak boleh kosong");
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("kategori", form.kategori);
      formData.append("deskripsi", form.deskripsi);
      formData.append("versi", form.versi);
      formData.append("id_ref", form.id_ref);
      formData.append("tags", JSON.stringify(form.tags));
      if (newFile) {
        formData.append("file", newFile);
      }
      formData.append("_method", "PUT");

      await updateTemplate(id as string, formData);
      toast.success("Template berhasil diperbarui!");
      navigate(`/master/template/${id}`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Gagal menyimpan template");
    } finally {
      setSaving(false);
    }
  };

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
          Kembali
        </button>
      </div>
    );
  }

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
                Edit Template
              </h1>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest leading-none">
                {template.kategori}
              </p>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 space-y-6 max-w-2xl mx-auto">
          {/* FORM SECTION */}
          <section className="bg-surface-dark/50 rounded-3xl p-6 border border-border-dark space-y-5 text-left">
            {/* NAMA */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                Nama Template
              </label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama template"
                className="w-full bg-background-dark border border-border-dark rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* KATEGORI */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                Kategori
              </label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleInputChange}
                className="w-full bg-background-dark border border-border-dark rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              >
                <option value="">Pilih kategori</option>
                <option value="Prosedur">Prosedur</option>
                <option value="Kebijakan">Kebijakan</option>
                <option value="Form">Form</option>
                <option value="Panduan">Panduan</option>
                <option value="SOP">SOP</option>
              </select>
            </div>

            {/* DESKRIPSI */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleInputChange}
                placeholder="Masukkan deskripsi template"
                rows={4}
                className="w-full bg-background-dark border border-border-dark rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>

            {/* VERSI & ID_REF */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                  Versi
                </label>
                <input
                  type="text"
                  name="versi"
                  value={form.versi}
                  onChange={handleInputChange}
                  placeholder="1.0"
                  className="w-full bg-background-dark border border-border-dark rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                  ID Referensi
                </label>
                <input
                  type="text"
                  name="id_ref"
                  value={form.id_ref}
                  onChange={handleInputChange}
                  placeholder="REF-001"
                  className="w-full bg-background-dark border border-border-dark rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>

            {/* TAGS */}
            <div>
              <label className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                Kategori Terkait (Tags)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  placeholder="Tambahkan tag"
                  className="flex-1 bg-background-dark border border-border-dark rounded-2xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-primary hover:bg-orange-600 text-white font-bold px-4 py-3 rounded-2xl transition-colors active:scale-95"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-background-dark border border-primary/30 text-primary text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        close
                      </span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* FILE SECTION */}
          <section className="bg-surface-dark/50 rounded-3xl p-6 border border-border-dark text-left">
            <h3 className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-4">
              File Template
            </h3>

            {/* CURRENT FILE INFO */}
            {template.file_path && !newFile && (
              <div className="bg-background-dark rounded-2xl p-4 mb-4 border border-border-dark/50">
                <p className="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-2">
                  File Saat Ini
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-200">
                      {template.tipe_file}
                    </p>
                    <p className="text-xs text-slate-400">
                      {template.ukuran_file}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary/50">
                    description
                  </span>
                </div>
              </div>
            )}

            {/* NEW FILE PREVIEW */}
            {newFile && (
              <div className="bg-orange-500/10 rounded-2xl p-4 mb-4 border border-orange-500/20">
                <p className="text-orange-400 text-[10px] uppercase tracking-widest font-black mb-2">
                  File Pengganti
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-orange-300">
                      {newFile.name}
                    </p>
                    <p className="text-xs text-orange-400/70">
                      {(newFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewFile(null)}
                    className="text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
            )}

            {/* FILE UPLOAD */}
            <label className="w-full bg-background-dark border-2 border-dashed border-border-dark rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors group">
              <span className="material-symbols-outlined text-3xl text-slate-500 group-hover:text-primary transition-colors mb-2">
                upload_file
              </span>
              <p className="text-sm font-bold text-slate-400 group-hover:text-slate-300 transition-colors">
                {newFile ? "Ganti file" : "Upload file baru"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF, DOCX, XLSX (Max 5MB)
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx"
                className="hidden"
              />
            </label>
          </section>

          {/* ACTIONS */}
          <section className="space-y-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">
                {saving ? "hourglass_bottom" : "save"}
              </span>
              {saving ? "Menyimpan..." : "SIMPAN PERUBAHAN"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-surface-dark hover:bg-surface-dark/80 border border-border-dark text-slate-300 font-bold py-3.5 rounded-2xl transition-colors active:scale-[0.98]"
            >
              Batal
            </button>
          </section>
        </main>
      </div>

      <BottomNav />
    </>
  );
};

export default TemplateEditPage;
