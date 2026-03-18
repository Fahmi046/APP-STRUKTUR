import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_SDM } from "../../data/sdmStore"; // 1. Import data terpusat

const SDMDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 1. Definisikan fungsi di sini agar bisa diakses di seluruh komponen
  const closeOnOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setIsDeleteModalOpen(false);
  };

  const employee = MOCK_SDM.find((emp) => emp.id === Number(id));

  if (!employee) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white p-6 text-center">
        <h2 className="text-xl font-bold">Karyawan tidak ditemukan</h2>
        <button
          onClick={() => navigate("/master/sdm")}
          className="mt-4 text-primary font-bold uppercase tracking-widest text-xs"
        >
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    console.log(`Menghapus karyawan dengan ID: ${id}`);
    setIsDeleteModalOpen(false);
    navigate("/master/sdm"); // Kembali ke list setelah "hapus"
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark overflow-x-hidden pb-32">
      {/* Header */}
      <div className="flex items-center bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 p-4 justify-between border-b border-slate-800">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-100 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          {" "}
          Detail Karyawan{" "}
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-transparent text-slate-100 hover:bg-slate-800">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex p-6">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-slate-800 p-1 bg-primary/10 flex items-center justify-center overflow-hidden">
              {/* Menggunakan inisial jika foto tidak ada */}
              <span className="text-primary text-3xl font-black uppercase tracking-tighter">
                {employee.inisial}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-slate-100 text-2xl font-bold leading-tight tracking-tight text-center">
                {employee.nama} {/* Data Dinamis */}
              </p>
              <p className="text-slate-400 text-sm font-normal leading-normal text-center">
                {employee.jabatan} • {employee.jenis}
              </p>
              <div
                className={`mt-2 px-3 py-1 rounded-full border ${employee.status === "Aktif" ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
              >
                <p
                  className={`${employee.status === "Aktif" ? "text-green-500" : "text-red-500"} text-[10px] font-bold uppercase tracking-wider`}
                >
                  {employee.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Card */}
      <div className="px-4 py-2">
        <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-5 space-y-5">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
            {" "}
            Informasi Kontak{" "}
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-12">
              <span className="material-symbols-outlined">call</span>
            </div>
            <div className="flex flex-col">
              <p className="text-slate-100 text-base font-semibold">
                {employee.hp}
              </p>
              <p className="text-slate-500 text-xs">Nomor Telepon</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-primary flex items-center justify-center rounded-xl bg-primary/10 shrink-0 size-12">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div className="flex flex-col">
              <p className="text-slate-100 text-base font-semibold leading-tight">
                {employee.alamat}
              </p>
              <p className="text-slate-500 text-xs mt-1">Alamat Domisili</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project History Section (Bisa dibuat dinamis nanti) */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-slate-100 text-lg font-bold tracking-tight">
            {" "}
            Riwayat Proyek{" "}
          </h3>
          <button className="text-primary text-xs font-bold uppercase tracking-wider">
            {" "}
            Lihat Semua{" "}
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-4 flex flex-col gap-3 text-center py-10">
            <span className="material-symbols-outlined text-slate-700 text-4xl">
              inventory_2
            </span>
            <p className="text-slate-500 text-xs italic font-display uppercase tracking-widest">
              Belum ada riwayat proyek
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      {/* Container Tombol yang mengikuti alur scroll (Tidak Mengambang) */}
      <div className="mt-10 mb-6 p-4 border-t border-slate-800/50 flex gap-3">
        <button className="flex-1 bg-primary text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined text-xl">edit</span>
          Edit Profil
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-surface-dark border border-red-500/30 text-red-500 font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 active:bg-red-500/10 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>
      {/* --- MODAL DELETE --- */}
      {isDeleteModalOpen && (
        <div
          onClick={closeOnOverlay}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
        >
          <div className="bg-neutral-dark w-full max-w-sm rounded-2xl border border-border-dark p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-red-500 text-4xl">
                  warning
                </span>
              </div>
              <h3 className="text-slate-100 text-lg font-bold">
                Hapus Karyawan?
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Apakah Anda yakin ingin menghapus{" "}
                <span className="text-slate-100 font-bold">
                  {employee.nama}
                </span>
                ? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={handleDelete}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-500/20"
              >
                Ya, Hapus Sekarang
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full bg-transparent text-slate-400 font-semibold py-3 rounded-xl hover:text-slate-100 transition-colors"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SDMDetailPage;
