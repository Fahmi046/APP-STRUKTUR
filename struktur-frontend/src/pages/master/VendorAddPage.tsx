import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VendorAddPage = () => {
  const navigate = useNavigate();

  // State untuk menampung data form
  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    email: "",
    npwp: "",
    alamat: "",
  });

  // Handle perubahan input secara dinamis
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan ke Console dulu (Minggu 0-1)
    console.log("Data Vendor Baru:", formData);

    // Nanti di Minggu 1: Tambahkan fungsi push ke MOCK_VENDOR atau API Laravel
    alert("Vendor berhasil disimpan!");
    navigate("/master/vendor"); // Kembali ke list
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-500 dark:text-slate-400 font-medium text-sm hover:opacity-80 transition-opacity"
        >
          Batal
        </button>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Tambah Vendor
        </h1>
        <button
          onClick={handleSave}
          className="text-primary font-bold text-sm hover:opacity-80 transition-opacity"
        >
          Simpan
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSave} className="max-w-md mx-auto p-4 space-y-6">
          <div className="bg-white dark:bg-card-dark rounded-xl p-5 shadow-sm space-y-5 border border-slate-100 dark:border-border-dark">
            {/* Nama Vendor */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Nama Vendor <span className="text-primary">*</span>
              </label>
              <input
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-input-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                placeholder="Masukkan nama vendor"
                required
                type="text"
              />
            </div>

            {/* Kontak */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Kontak
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">
                  call
                </span>
                <input
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-input-dark border border-slate-200 dark:border-border-dark rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  placeholder="Masukkan nomor kontak"
                  type="tel"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">
                  mail
                </span>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-input-dark border border-slate-200 dark:border-border-dark rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  placeholder="Masukkan alamat email"
                  type="email"
                />
              </div>
            </div>

            {/* NPWP */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                NPWP
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">
                  badge
                </span>
                <input
                  name="npwp"
                  value={formData.npwp}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-input-dark border border-slate-200 dark:border-border-dark rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  placeholder="00.000.000.0-000.000"
                  type="text"
                />
              </div>
            </div>

            {/* Alamat */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-input-dark border border-slate-200 dark:border-border-dark rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                placeholder="Masukkan alamat lengkap vendor"
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="px-2 flex items-start gap-2 text-slate-500 dark:text-slate-400 text-xs">
            <span className="material-symbols-outlined text-base">info</span>
            <p>
              Pastikan data yang Anda masukkan sudah benar sebelum menekan
              tombol simpan.
            </p>
          </div>

          <div className="h-24"></div>
        </form>
      </main>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">save</span>
            Simpan Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorAddPage;
