import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialDetail, deleteMaterial } from "../../api/materialService";
import toast from "react-hot-toast";
import BottomNav from "../../components/BottomNav";

const MaterialDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Helper untuk format Rupiah Akuntansi
  const formatRupiah = (number: number | string) => {
    if (!number) return "0,-";
    return `${Number(number).toLocaleString("id-ID")},-`;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getMaterialDetail(id as string);
        setDetail(data);
      } catch (error) {
        console.error("Gagal load data:", error);
        toast.error("Gagal mengambil data material");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteMaterial(id as string);
      toast.success("Material berhasil dihapus!");
      setIsDeleteModalOpen(false);
      navigate("/master/material");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Gagal menghapus material.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
        <p className="font-medium animate-pulse">Mengambil data material...</p>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-slate-400 p-6">
        <div className="text-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 w-full max-w-xs">
          <span className="material-symbols-outlined text-6xl mb-4 text-slate-600">
            inventory_2
          </span>
          <p className="text-lg font-bold text-white">Data Hilang</p>
          <p className="text-xs opacity-50 mb-6">ID #{id} tidak ditemukan</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-slate-100 font-display pb-32">
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-slate-800">
          <button
            onClick={() => navigate("/master/material")}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold flex-1 text-center text-white">
            Detail Material
          </h1>
          <button
            onClick={() => navigate(`/master/material/edit/${id}`)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 text-primary transition-colors"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </header>

        {/* Hero Section / Gambar */}
        <div className="px-4 py-4">
          <div
            className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-slate-800 shadow-2xl border border-slate-800"
            style={{
              backgroundImage: detail.image
                ? `linear-gradient(to bottom, rgba(11, 15, 25, 0.1), rgba(11, 15, 25, 0.95)), url('http://127.0.0.1:8000/storage/${detail.image}')`
                : `linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(30, 41, 59, 0.9))`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 inline-block">
                {detail.kategori || "General"}
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                {detail.nama}
              </h2>
              <p className="mt-1 text-slate-400 font-medium text-sm">
                Merk:{" "}
                <span className="text-slate-200">{detail.merk || "-"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-4 px-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-900/40 p-5 border border-slate-800/60 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                Harga Estimasi
              </p>
              <p className="text-xl font-black text-primary">
                {formatRupiah(detail.harga)}
              </p>
              <p className="text-[10px] text-slate-500 font-bold mt-1">
                SATUAN: {detail.satuan?.toUpperCase() || "PCS"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900/40 p-5 border border-slate-800/60 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                Stok Saat Ini
              </p>
              <p className="text-xl font-black text-white">
                {detail.stok || 0}{" "}
                <span className="text-xs font-normal text-slate-500">
                  {detail.satuan || "pcs"}
                </span>
              </p>
              <div
                className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase border ${
                  (detail.stok || 0) < (detail.min_stok || 5)
                    ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                }`}
              >
                <span className="size-1.5 rounded-full bg-current animate-pulse"></span>
                {(detail.stok || 0) < (detail.min_stok || 5)
                  ? "Kritis"
                  : "Aman"}
              </div>
            </div>
          </div>

          {/* Table Information */}
          <div className="rounded-2xl bg-slate-900/40 p-6 border border-slate-800/60">
            <h3 className="mb-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Spesifikasi Material
            </h3>
            <div className="space-y-4">
              {[
                { label: "Tipe / Varian", value: detail.tipe || "-" },
                { label: "Vendor Utama", value: detail.vendor || "-" },
                {
                  label: "Status Katalog",
                  value: detail.status || "Aktif",
                  isStatus: true,
                },
                {
                  label: "Min. Stok Alert",
                  value: `${detail.min_stok || 5} ${detail.satuan || "pcs"}`,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-slate-800/40 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-medium text-slate-500">
                    {item.label}
                  </span>
                  <span
                    className={`text-sm font-bold ${item.isStatus ? "text-primary" : "text-slate-200"}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <button className="w-full rounded-2xl bg-primary py-4 font-black text-white shadow-xl shadow-primary/25 active:scale-[0.97] transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-lg">
                swap_vertical_circle
              </span>
              Update Stok Masuk / Keluar
            </button>

            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full rounded-2xl bg-slate-900 border border-rose-500/20 py-4 text-[10px] font-black text-rose-500/80 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em]"
            >
              <span className="material-symbols-outlined text-sm">
                delete_sweep
              </span>
              Hapus Dari Katalog
            </button>
          </div>
        </div>

        {/* Modal Konfirmasi Hapus */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div
              className="absolute inset-0 bg-background-dark/90 backdrop-blur-md transition-opacity"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            <div className="relative w-full max-w-sm bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/5 animate-in zoom-in duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="size-20 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6 ring-8 ring-rose-500/5">
                  <span className="material-symbols-outlined text-5xl">
                    warning
                  </span>
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  Konfirmasi Hapus
                </h3>
                <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                  Apakah Anda yakin ingin menghapus <b>{detail.nama}</b>?
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-10">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full py-4 rounded-2xl font-bold bg-slate-800 text-slate-400 active:scale-95 transition-all text-xs uppercase tracking-widest"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full py-4 rounded-2xl font-bold bg-rose-600 text-white shadow-lg shadow-rose-900/40 active:scale-95 transition-all text-xs uppercase tracking-widest"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default MaterialDetailPage;
