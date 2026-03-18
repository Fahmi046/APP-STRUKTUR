import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_VENDOR } from "../../data/vendorStore";

const VendorDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Cari vendor berdasarkan ID URL
  const vendor = MOCK_VENDOR.find((v) => v.id === Number(id));

  if (!vendor) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white p-6 text-center">
        <h2 className="text-xl font-bold text-slate-100">
          Vendor tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/master/vendor")}
          className="mt-4 text-primary font-bold"
        >
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    // Logika hapus (Minggu 1: Akan dihubungkan ke API Laravel)
    console.log("Menghapus Vendor ID:", id);
    setIsDeleteModalOpen(false);
    navigate("/master/vendor");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-32">
      {/* Header */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 sticky top-0 z-10 border-b border-slate-200 dark:border-border-dark justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-slate-100 flex size-10 items-center justify-center transition-active active:scale-90"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold flex-1 text-center">
          Detail Vendor
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button
            onClick={() => navigate(`/master/vendor/edit/${id}`)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-border-dark transition-colors"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Card */}
        <div className="p-4">
          <div className="flex flex-col items-center justify-center rounded-xl p-6 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark shadow-sm">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">
                {vendor.icon || "domain"}
              </span>
            </div>
            <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight mb-1 text-center">
              {vendor.nama}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {vendor.deskripsi}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark text-center">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase mb-1">
                Total Material
              </span>
              <p className="text-primary text-xl font-bold">
                {vendor.totalMaterial} Material
              </p>
            </div>
            <div className="flex flex-col p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark text-center">
              <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase mb-1">
                Status
              </span>
              <p className="text-green-500 text-xl font-bold">
                {vendor.poAktif} PO Aktif
              </p>
            </div>
          </div>
        </div>

        {/* Info Contact Section */}
        <div className="px-4 pb-4">
          <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-border-dark text-slate-900 dark:text-white font-bold">
              Informasi Kontak
            </div>
            {[
              { icon: "call", label: "Telepon", value: vendor.hp },
              { icon: "mail", label: "Email", value: vendor.email },
              { icon: "location_on", label: "Alamat", value: vendor.alamat },
              { icon: "assignment_ind", label: "NPWP", value: vendor.npwp },
            ].map((info, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border-b last:border-0 border-slate-100 dark:border-border-dark/50"
              >
                <div className="flex items-center justify-center rounded-lg bg-primary/10 text-primary size-10 shrink-0">
                  <span className="material-symbols-outlined">{info.icon}</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-400 text-xs">{info.label}</p>
                  <p className="text-slate-900 dark:text-slate-100 text-sm font-medium whitespace-pre-wrap">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Section */}
        <div className="px-4 pb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-900 dark:text-white font-bold">
              Material yang Dipasok
            </h3>
            <button className="text-primary text-sm font-semibold hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {vendor.materials.map((mat) => (
              <div
                key={mat.id}
                className="flex items-center gap-4 p-3 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl transition-active active:scale-[0.98]"
              >
                <div className="size-12 rounded-lg bg-slate-100 dark:bg-border-dark flex items-center justify-center overflow-hidden text-slate-400">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">
                    {mat.nama}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    {mat.satuan}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-900 dark:text-slate-100 text-sm font-bold">
                    Rp {mat.harga.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions Area */}
        <div className="px-4 flex flex-col gap-3 mb-8">
          <button
            onClick={() => navigate(`/master/vendor/edit/${id}`)}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">edit</span>
            Edit Vendor
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-full h-12 border-2 border-red-500/50 text-red-500 hover:bg-red-500/5 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">delete</span>
            Hapus Vendor
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi Hapus (Identik dengan SDM) */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsDeleteModalOpen(false)}
          ></div>

          <div className="relative w-full max-w-sm bg-white dark:bg-card-dark rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="size-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                <span className="material-symbols-outlined text-4xl">
                  warning
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Hapus Vendor?
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                Data <b>{vendor.nama}</b> akan dihapus secara permanen. Tindakan
                ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-3 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 transition-colors"
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

export default VendorDetailPage;
