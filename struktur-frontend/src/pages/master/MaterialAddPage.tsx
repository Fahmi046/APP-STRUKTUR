import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav"; // Pastikan path import benar

const MaterialAddPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    merk: "",
    tipe: "",
    harga: "",
    satuan: "pcs",
    stok: "",
    minStok: "5",
    vendor: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Menyimpan Data:", formData);
    navigate("/master/material");
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display pb-32">
      {/* Header - Sticky di atas layar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-background-dark/80 backdrop-blur-lg border-b border-slate-800">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-400 font-medium text-sm hover:text-white transition-colors"
        >
          Batal
        </button>
        <h1 className="text-white text-lg font-bold">Tambah Material</h1>
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20"
        >
          Simpan
        </button>
      </header>

      {/* Main Content - Scroll Mengikuti Body */}
      <main className="p-4 space-y-6 max-w-md mx-auto">
        {/* Card 1: Foto Material */}
        <section className="bg-card-dark p-5 rounded-xl border border-slate-800 shadow-sm">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-primary text-xl">
              image
            </span>
            Foto Material
          </h3>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-square max-w-[180px] rounded-xl border-2 border-dashed border-slate-700 bg-background-dark flex flex-col items-center justify-center text-slate-500 gap-2 relative overflow-hidden group transition-all hover:border-primary/50">
              <span className="material-symbols-outlined text-4xl">
                add_a_photo
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider">
                Pratinjau Foto
              </span>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <button className="w-full bg-primary/10 text-primary border border-primary/20 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined text-xl">upload</span>
              Upload Foto
            </button>
          </div>
        </section>

        {/* Card 2: Informasi Dasar */}
        <section className="bg-card-dark p-5 rounded-xl border border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-primary text-xl">
              info
            </span>
            Informasi Dasar
          </h3>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
              Nama Material
            </label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
              placeholder="Contoh: Semen Portland 50kg"
              type="text"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
              Kategori
            </label>
            <div className="relative">
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full appearance-none bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
              >
                <option value="">Pilih Kategori</option>
                <option value="bahan-bangunan">Bahan Bangunan</option>
                <option value="alat-listrik">Alat Listrik</option>
                <option value="pipa-sanitasi">Pipa & Sanitasi</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-3 pointer-events-none text-slate-500">
                expand_more
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Merk
              </label>
              <input
                name="merk"
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Merk"
                type="text"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Tipe
              </label>
              <input
                name="tipe"
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Tipe"
                type="text"
              />
            </div>
          </div>
        </section>

        {/* Card 3: Harga & Stok */}
        <section className="bg-card-dark p-5 rounded-xl border border-slate-800 space-y-4 shadow-sm">
          <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-primary text-xl">
              payments
            </span>
            Harga & Stok
          </h3>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
              Harga Satuan
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500 font-medium">
                Rp
              </span>
              <input
                name="harga"
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl pl-12 pr-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="0"
                type="number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Stok Gudang
              </label>
              <input
                name="stok"
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                placeholder="0"
                type="number"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Min. Stok
              </label>
              <input
                name="minStok"
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                placeholder="5"
                type="number"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MaterialAddPage;
