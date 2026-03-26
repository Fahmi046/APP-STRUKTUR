import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVendorDetail, updateVendor } from "../../api/vendorService";
import toast from "react-hot-toast";

const VendorEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama: "",
    kontak: "",
    email: "",
    npwp: "",
    alamat: "",
    status: "Aktif",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Ambil data lama dari Laravel
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const data = await getVendorDetail(id);
          setFormData({
            nama: data.nama || "",
            kontak: data.kontak || "",
            email: data.email || "",
            npwp: data.npwp || "",
            alamat: data.alamat || "",
            status: data.status || "Aktif",
          });
        }
      } catch (error) {
        toast.error("Gagal memuat data vendor");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Kirim perubahan ke Database dengan Toast
  const handleUpdate = async () => {
    if (!formData.nama || !formData.email) {
      toast.error("Nama dan Email wajib diisi!");
      return;
    }

    try {
      setSaving(true);
      if (id) {
        await updateVendor(id, formData);

        // Notifikasi Sukses
        toast.success("Vendor berhasil diperbarui!");

        navigate(`/master/vendor/detail/${id}`);
      }
    } catch (error: any) {
      console.error("Gagal update:", error);
      toast.error(error.response?.data?.message || "Gagal memperbarui data");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-white gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
        <p className="text-slate-400 font-medium">Memuat Data...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background-dark pb-20 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 font-medium hover:text-white transition-colors"
        >
          Batal
        </button>
        <h1 className="text-lg font-bold">Edit Vendor</h1>
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {saving ? "..." : "Simpan"}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Info Card */}
        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full mx-auto flex items-center justify-center mb-3 border border-primary/20">
            <span className="material-symbols-outlined text-2xl">business</span>
          </div>
          <h2 className="font-bold text-slate-200">
            {formData.nama || "Tanpa Nama"}
          </h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-bold">
            {formData.status}
          </p>
        </div>

        <section className="space-y-5">
          {/* Input Nama */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Nama Vendor
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Input Email */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Input Kontak */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Kontak
            </label>
            <input
              name="kontak"
              value={formData.kontak}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Input NPWP */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              NPWP
            </label>
            <input
              name="npwp"
              value={formData.npwp}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Input Alamat */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-wider">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-slate-100 outline-none focus:border-primary transition-all resize-none"
              rows={4}
            />
          </div>

          {/* Status Toggle */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-slate-100 font-bold text-sm">
                Status Vendor
              </h3>
              <p
                className={`text-[10px] uppercase font-black tracking-tighter ${formData.status === "Aktif" ? "text-primary" : "text-rose-500"}`}
              >
                {formData.status}
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
            onClick={handleUpdate}
            disabled={saving}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {saving ? "Memproses..." : "Update Vendor Sekarang"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default VendorEditPage;
