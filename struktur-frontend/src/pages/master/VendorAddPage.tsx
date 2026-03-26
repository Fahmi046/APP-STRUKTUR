import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVendor } from "../../api/vendorService";
import toast from "react-hot-toast";

const VendorAddPage = () => {
  const navigate = useNavigate();

  // State untuk menampung data form
  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    npwp: "",
    alamat: "",
    status: "Aktif",
  });

  const [loading, setLoading] = useState(false);

  // Handle perubahan input secara dinamis
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.nama || !formData.alamat) {
      toast.error("Nama dan Alamat wajib diisi!");
      return;
    }

    try {
      setLoading(true);
      await createVendor(formData);

      // Notifikasi Sukses
      toast.success("Vendor berhasil ditambahkan!");

      navigate("/master/vendor"); // Kembali ke list
    } catch (error: any) {
      console.error("Gagal simpan:", error);
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
        <h1 className="text-lg font-bold">Tambah Vendor</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? "..." : "Simpan"}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Form Fields */}
        <section className="space-y-5">
          {/* Nama Vendor */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Nama Vendor
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder-slate-500"
              placeholder="Masukkan nama vendor"
              required
            />
          </div>

          {/* Kontak */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Nomor Kontak
            </label>
            <input
              name="kontak"
              value={formData.kontak}
              onChange={handleChange}
              type="tel"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder-slate-500"
              placeholder="Masukkan nomor kontak"
            />
          </div>

          {/* NPWP */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              NPWP
            </label>
            <input
              name="npwp"
              value={formData.npwp}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all placeholder-slate-500"
              placeholder="00.000.000.0-000.000"
            />
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Alamat Lengkap
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder-slate-500"
              placeholder="Masukkan alamat lengkap vendor"
              rows={4}
            ></textarea>
          </div>

          {/* Toggle Status */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-slate-100 font-bold text-sm">Status Aktif</h3>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                Aktifkan vendor
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
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Sedang Menyimpan..." : "Simpan Data Vendor"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default VendorAddPage;
