import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMaterial } from "../../api/materialService";
import BottomNav from "../../components/BottomNav";

const MaterialListPage = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filters = ["Semua", "Stok Rendah"];

  // Helper Format Rupiah Akuntansi
  const formatRupiah = (number: number | string) => {
    if (!number) return "0,-";
    return `${Number(number).toLocaleString("id-ID")},-`;
  };

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        const data = await getMaterial();
        setMaterials(data);
      } catch (error) {
        console.error("Gagal load data Material:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, []);

  const filteredMaterials = materials.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.merk &&
        item.merk.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter =
      activeFilter === "Semua" ||
      (activeFilter === "Stok Rendah" && item.stok < item.min_stok);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-background-dark font-display text-slate-100 antialiased min-h-screen pb-32">
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-2 border-b border-slate-800/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Material
          </h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-surface-dark transition-colors text-slate-400">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-surface-dark border border-slate-800 rounded-xl focus:ring-2 focus:ring-primary text-sm placeholder:text-slate-500 transition-all text-white outline-none"
            placeholder="Cari nama material, merk..."
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === f
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-surface-dark border border-slate-800 text-slate-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* List View */}
      <main className="px-4 py-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary/20 border-t-primary mb-4"></div>
            <p className="text-xs font-bold uppercase tracking-widest">
              Sinkronisasi Data...
            </p>
          </div>
        ) : filteredMaterials.length > 0 ? (
          filteredMaterials.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/master/material/detail/${item.id}`)}
              className="group relative flex flex-col p-4 bg-surface-dark border border-slate-800 rounded-2xl shadow-sm active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
            >
              <div className="flex gap-4 items-start">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl bg-background-dark flex items-center justify-center overflow-hidden shrink-0 border border-slate-800 shadow-inner">
                  {item.image ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${item.image}`}
                      alt={item.nama}
                      className="object-cover w-full h-full opacity-90 group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-slate-700 text-3xl">
                      inventory
                    </span>
                  )}
                </div>

                {/* Info Utama */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white truncate text-base leading-tight">
                      {item.nama}
                    </h3>
                    <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">
                      arrow_forward_ios
                    </span>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">
                    {item.merk || "No Brand"} • {item.kategori || "General"}
                  </p>

                  {/* Harga Format Akuntansi */}
                  <p className="mt-3 font-black text-primary text-lg tracking-tight">
                    {formatRupiah(item.harga)}
                    <span className="text-[10px] text-slate-500 font-bold tracking-normal">
                      {" "}
                      / {item.satuan || "pcs"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status & Stok Bar (Informasi Stok Tambahan) */}
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                    Stok:
                  </span>
                  <span
                    className={`text-sm font-black ${item.stok < item.min_stok ? "text-rose-500" : "text-white"}`}
                  >
                    {item.stok || 0} {item.satuan || "pcs"}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-[0.1em] border ${
                    item.stok < item.min_stok
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }`}
                >
                  {item.stok < item.min_stok ? "⚠️ Re-Stock" : "✓ Ready"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-24">
            <div className="inline-flex size-20 items-center justify-center rounded-full bg-slate-900 mb-4 border border-slate-800">
              <span className="material-symbols-outlined text-4xl text-slate-700">
                search_off
              </span>
            </div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              Data tidak ditemukan
            </p>
          </div>
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => navigate("/master/material/add")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40 border border-white/10"
      >
        <span className="material-symbols-outlined text-3xl font-bold">
          add
        </span>
      </button>

      <BottomNav />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MaterialListPage;
