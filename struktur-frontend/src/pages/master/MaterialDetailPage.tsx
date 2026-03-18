import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// MENGGUNAKAN PENGAMBILAN DATA DARI STORE
import { MOCK_MATERIAL } from "../../data/materialStore";

const MaterialDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil ID dari URL (String)
  const [activeTab, setActiveTab] = useState("PO");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // FIX: Gunakan Number(id) agar cocok dengan tipe data id di MOCK_MATERIAL
  const detail = MOCK_MATERIAL.find((m) => m.id === Number(id));

  // Jika data tidak ditemukan
  if (!detail) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-slate-400">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl mb-4">
            inventory_2
          </span>
          <p className="text-lg font-semibold">Material tidak ditemukan</p>
          <p className="text-sm opacity-50 mb-6">
            ID #{id} tidak ada dalam database
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-primary text-white rounded-xl font-bold active:scale-95 transition-all"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    console.log(`Menghapus material: ${detail.nama}`);
    setIsDeleteModalOpen(false);
    navigate("/master/material");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-slate-100 font-display pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-800">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold flex-1 text-center text-white">
          Detail Material
        </h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 text-primary transition-colors">
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      {/* Hero Section */}
      <div className="px-4 py-4">
        <div
          className="relative h-64 w-full overflow-hidden rounded-2xl bg-slate-800 shadow-xl border border-slate-800"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 25, 0.1), rgba(11, 15, 25, 0.95)), url('${detail.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-3xl font-black text-white tracking-tight leading-none">
              {detail.nama}
            </h2>
            <p className="mt-2 text-slate-400 font-medium">
              {detail.kategori} | {detail.merk}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-4 px-4">
        {/* Stats Row */}
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl bg-slate-900/50 p-4 border border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Harga Estimasi
            </p>
            <p className="text-xl font-black text-primary">
              Rp {detail.harga?.toLocaleString() ?? "0"}
            </p>
            <p className="text-[10px] text-slate-500 font-medium italic">
              per {detail.satuan?.toLowerCase()}
            </p>
          </div>
          <div className="flex-1 rounded-xl bg-slate-900/50 p-4 border border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Stok Gudang
            </p>
            <p className="text-xl font-black text-white">
              {detail.stok} {detail.satuan}
            </p>
            <div
              className={`mt-2 inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase border ${
                detail.stok < 10
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : "bg-green-500/10 text-green-500 border-green-500/20"
              }`}
            >
              ● {detail.stok < 10 ? "Kritis" : "Tersedia"}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="rounded-xl bg-slate-900/50 p-5 border border-slate-800">
          <h3 className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Informasi Tambahan
          </h3>
          <div className="space-y-4">
            {[
              { label: "Standar SNI", value: detail.standar || "-" },
              { label: "Berat Satuan", value: detail.berat || "-" },
              { label: "Status Gudang", value: detail.status || "Aktif" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between border-b border-slate-800/50 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="text-sm font-semibold text-slate-200">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-8 pb-10">
          <button className="w-full rounded-2xl bg-primary py-4 font-black text-white shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm uppercase">
            <span className="material-symbols-outlined">inventory</span>
            Atur Keluar Masuk Stok
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full rounded-2xl bg-transparent border border-red-500/30 py-4 text-xs font-bold text-red-500/60 hover:text-red-500 active:bg-red-500/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Hapus Data Material
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>
          <div className="relative w-full max-w-sm bg-[#161B26] rounded-3xl p-6 shadow-2xl border border-white/5 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 ring-8 ring-red-500/5">
                <span className="material-symbols-outlined text-5xl">
                  warning
                </span>
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Hapus Material?
              </h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed px-2">
                Material <b>{detail.nama}</b> akan dihapus permanen. Stok dan
                riwayat akan hilang dari sistem.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-10">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-4 rounded-2xl font-bold bg-slate-800 text-slate-300 active:scale-95 transition-all text-sm"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-4 rounded-2xl font-bold bg-red-500 text-white shadow-lg shadow-red-500/30 active:scale-95 transition-all text-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialDetailPage;
