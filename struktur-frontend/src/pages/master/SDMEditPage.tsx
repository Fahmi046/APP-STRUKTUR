import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKaryawanDetail, updateKaryawan } from "../../api/sdmService";

const SDMEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    divisi: "",
    email: "",
    status: "Aktif",
    nip: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Ambil data lama dari Laravel
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const data = await getKaryawanDetail(id);
          setFormData({
            nama: data.nama || "",
            jabatan: data.jabatan || "",
            divisi: data.divisi || "Umum",
            email: data.email || "",
            status: data.status || "Aktif",
            nip: data.nip || "",
          });
        }
      } catch (error) {
        alert("Gagal memuat data karyawan");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Kirim perubahan ke Database
  const handleUpdate = async () => {
    try {
      setSaving(true);
      if (id) {
        await updateKaryawan(id, formData);
        alert("Profil berhasil diperbarui!");
        navigate(`/master/sdm/detail/${id}`); // Balik ke detail setelah edit
      }
    } catch (error) {
      alert("Gagal memperbarui data");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-white">
        Memuat Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-background-dark pb-20 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-slate-400">
          Batal
        </button>
        <h1 className="text-lg font-bold">Edit Profil</h1>
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20"
        >
          {saving ? "..." : "Simpan"}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        <section className="space-y-5">
          {/* Input Nama */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Nama Lengkap
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 outline-none focus:border-primary"
            />
          </div>

          {/* Input Email */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 outline-none focus:border-primary"
            />
          </div>

          {/* Pilih Jabatan */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Jabatan
            </label>
            <select
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Site Manager">Site Manager</option>
              <option value="Logistik">Logistik</option>
              <option value="Worker">Worker</option>
            </select>
          </div>

          {/* Input NIP */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              NIP
            </label>
            <input
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              type="text"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-slate-100 outline-none focus:border-primary"
            />
          </div>

          {/* Status Toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-slate-100 font-bold text-sm">
                Status Karyawan
              </h3>
              <p className="text-[10px] text-slate-500 uppercase">
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
              <div className="w-11 h-6 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </section>

        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
        >
          {saving ? "Memproses..." : "Update Profil Sekarang"}
        </button>
      </main>
    </div>
  );
};

export default SDMEditPage;
