import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKaryawan } from "../../api/sdmService";
import toast from "react-hot-toast"; // 1. Import toast

const SDMAddPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    divisi: "Umum",
    email: "",
    status: "Aktif",
    nip: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Fungsi Simpan dengan Toast
  const handleSave = async () => {
    // Validasi sederhana
    if (!formData.nama || !formData.email) {
      toast.error("Nama dan Email wajib diisi!", {
        style: { borderRadius: "12px", background: "#1e293b", color: "#fff" },
      });
      return;
    }

    try {
      setLoading(true);
      await createKaryawan(formData);

      // 3. Notifikasi Berhasil
      toast.success("Karyawan berhasil ditambahkan!");

      navigate("/master/sdm");
    } catch (error: any) {
      console.error("Gagal simpan:", error);
      // 4. Notifikasi Gagal
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark pb-20 text-white">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 font-medium hover:text-white transition-colors"
        >
          Batal
        </button>
        <h1 className="text-lg font-bold">Tambah Karyawan</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? "..." : "Simpan"}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6 text-center">
        {/* Profile Photo Placeholder */}
        <div className="flex flex-col items-center mb-2">
          <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden transition-all hover:border-primary/50 group cursor-pointer">
            <span className="material-symbols-outlined text-slate-600 text-3xl group-hover:text-primary transition-colors">
              add_a_photo
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-widest font-black">
            Foto Profil (Opsional)
          </p>
        </div>

        {/* Form Fields */}
        <section className="space-y-5">
          {/* Nama */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Nama Lengkap
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Email */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Email Perusahaan
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
              placeholder="contoh@perusahaan.com"
            />
          </div>

          {/* Jabatan */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Jabatan / Posisi
            </label>
            <div className="relative">
              <select
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 appearance-none outline-none focus:border-primary transition-all"
              >
                <option value="">Pilih Jabatan</option>
                <option value="Admin">Admin</option>
                <option value="Site Manager">Site Manager</option>
                <option value="Logistik">Logistik</option>
                <option value="Worker">Worker</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* NIP */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              NIP (Nomor Induk)
            </label>
            <input
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary transition-all"
              placeholder="Contoh: 19920801"
            />
          </div>

          {/* Toggle Status */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-slate-100 font-bold text-sm">Status Aktif</h3>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
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
              <div className="w-12 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
          </div>
        </section>

        <div className="pt-6">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Sedang Menyimpan..." : "Simpan Data Karyawan"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default SDMAddPage;
