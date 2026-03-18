import React from "react";
import { useNavigate } from "react-router-dom";

const SDMAddPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-20">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors"
        >
          Batal
        </button>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Tambah Karyawan
        </h1>
        <button
          onClick={() => navigate("/master/sdm")}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20"
        >
          Simpan
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-card-dark border-2 border-dashed border-border-dark flex items-center justify-center overflow-hidden transition-colors group-hover:border-primary/50">
              <span className="material-symbols-outlined text-slate-500 text-3xl">
                add_a_photo
              </span>
            </div>
            <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full shadow-lg">
              <span className="material-symbols-outlined text-white text-sm block">
                edit
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 uppercase tracking-[0.2em] font-bold">
            Foto Profil
          </p>
        </div>

        {/* Form Fields */}
        <section className="space-y-5">
          {/* Nama */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <input
              type="text"
              className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Jenis Karyawan */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">
              Jenis Karyawan
            </label>
            <div className="relative">
              <select className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 appearance-none focus:ring-1 focus:ring-primary outline-none cursor-pointer">
                <option disabled selected value="">
                  Pilih jenis
                </option>
                <option value="tetap">Karyawan Tetap</option>
                <option value="kontrak">Kontrak</option>
                <option value="magang">Magang</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Keahlian / Tags */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">
              Keahlian
            </label>
            <div className="bg-card-dark border border-border-dark rounded-xl p-3 flex flex-wrap gap-2 min-h-[56px] items-center">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-primary/20">
                UI Design{" "}
                <span className="material-symbols-outlined text-[14px] cursor-pointer">
                  close
                </span>
              </span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-primary/20">
                React{" "}
                <span className="material-symbols-outlined text-[14px] cursor-pointer">
                  close
                </span>
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm py-1 px-2 text-slate-100 placeholder-slate-600 flex-1 min-w-[80px]"
                placeholder="Tambah..."
                type="text"
              />
            </div>
          </div>

          {/* Nomor HP */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">
              Nomor Handphone
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 font-bold border-r border-border-dark pr-3">
                +62
              </span>
              <input
                className="w-full bg-card-dark border border-border-dark rounded-xl pl-16 pr-4 py-3.5 text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-primary outline-none"
                placeholder="812 3456 7890"
                type="tel"
              />
            </div>
          </div>

          {/* Alamat */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-wider">
              Alamat Domisili
            </label>
            <textarea
              className="w-full bg-card-dark border border-border-dark rounded-xl px-4 py-3.5 text-slate-100 placeholder-slate-600 focus:ring-1 focus:ring-primary resize-none outline-none"
              placeholder="Masukkan alamat lengkap..."
              rows={3}
            ></textarea>
          </div>

          {/* Toggle Status */}
          <div className="bg-card-dark border border-border-dark rounded-xl p-4 flex items-center justify-between shadow-inner">
            <div>
              <h3 className="text-slate-100 font-bold text-sm">Status Aktif</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-tight">
                Aktifkan untuk akses sistem
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input checked className="sr-only peer" type="checkbox" />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </section>

        {/* Footer Button */}
        <div className="pt-8">
          <button
            onClick={() => navigate("/master/sdm")}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
          >
            Simpan Data Karyawan
          </button>
          <p className="text-center text-slate-500 text-[10px] mt-4 px-10 leading-relaxed uppercase tracking-tighter">
            Pastikan data sesuai dengan dokumen resmi perusahaan.
          </p>
        </div>
      </main>

      {/* Aesthetic bottom gradient */}
      <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </div>
  );
};

export default SDMAddPage;
