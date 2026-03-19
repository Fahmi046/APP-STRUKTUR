import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKaryawan } from "../../api/sdmService";

const SDMAddPage = () => {
  const navigate = useNavigate();

  // 1. State untuk menampung data Form
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "", // Kita gunakan Jabatan sebagai "Jenis Karyawan" sesuai tabel DB
    divisi: "Umum", // Default
    email: "",
    status: "Aktif",
    nip: "",
  });

  const [loading, setLoading] = useState(false);

  // 2. Handler untuk perubahan input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Fungsi Simpan ke Database
  const handleSave = async () => {
    if (!formData.nama || !formData.email) {
      alert("Nama dan Email wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      await createKaryawan(formData);
      alert("Karyawan berhasil ditambahkan!");
      navigate("/master/sdm"); // Kembali ke daftar
    } catch (error: any) {
      console.error("Gagal simpan:", error);
      alert(
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark px-4 py-3 flex items-center justify-between text-white">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 font-medium"
        >
          Batal
        </button>
        <h1 className="text-lg font-semibold">Tambah Karyawan</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-lg"
        >
          {loading ? "..." : "Simpan"}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-card-dark border-2 border-dashed border-border-dark flex items-center justify-center overflow-hidden transition-colors group-hover:border-primary/50">
            <span className="material-symbols-outlined text-slate-500 text-3xl">
              add_a_photo
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-widest font-bold text-white">
            Foto Profil (Opsional)
          </p>
        </div>

        {/* Form Fields */}
        <section className="space-y-5">
          {/* Nama */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Nama Lengkap
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              type="text"
              className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 outline-none focus:border-primary"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Email (Penting untuk DB) */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Email Perusahaan
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 outline-none focus:border-primary"
              placeholder="contoh@perusahaan.com"
            />
          </div>

          {/* Jabatan / Jenis */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              Jabatan / Posisi
            </label>
            <div className="relative">
              <select
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 appearance-none outline-none focus:border-primary"
              >
                <option value="">Pilih Jabatan</option>
                <option value="Admin">Admin</option>
                <option value="Site Manager">Site Manager</option>
                <option value="Logistik">Logistik</option>
                <option value="Worker">Worker</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                expand_more
              </span>
            </div>
          </div>

          {/* NIP */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">
              NIP (Nomor Induk)
            </label>
            <input
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              type="text"
              className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 outline-none focus:border-primary"
              placeholder="Contoh: 19920801"
            />
          </div>

          {/* Toggle Status */}
          <div className="bg-card-dark border border-border-dark rounded-xl p-4 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-slate-100 font-bold text-sm">Status Aktif</h3>
              <p className="text-[10px] text-slate-500 uppercase">
                Aktifkan untuk akses sistem
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status === "Aktif"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.checked ? "Aktif" : "Non-Aktif",
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </section>

        <div className="pt-8">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl disabled:opacity-50"
          >
            {loading ? "Sedang Menyimpan..." : "Simpan Data Karyawan"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SDMAddPage;
