import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_MATERIAL } from "../../data/materialStore";
import BottomNav from "../../components/BottomNav";

const MaterialListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filters = ["Semua", "Stok Rendah", "Besi", "Semen", "Pasir"];

  const filteredMaterials = MOCK_MATERIAL.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.merk.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "Semua" ||
      (activeFilter === "Stok Rendah"
        ? item.status === "Stok Rendah"
        : item.kategori === activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-background-dark font-display text-slate-100 antialiased min-h-screen pb-24">
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Material
          </h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-surface-dark transition-colors text-slate-400">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-dark transition-colors text-slate-400">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-surface-dark border-none rounded-xl focus:ring-2 focus:ring-primary text-sm placeholder:text-slate-500 transition-all text-white"
            placeholder="Cari nama material, merk, kategori..."
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f
                  ? "bg-primary text-white"
                  : "bg-surface-dark border border-border-dark text-slate-400 font-medium"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* List View - DARK THEME CARDS */}
      <main className="px-4 py-2 space-y-3">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/master/material/detail/${item.id}`)}
            className="flex items-center gap-4 p-4 bg-surface-dark border border-border-dark rounded-xl shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
          >
            {/* Image Container */}
            <div className="w-16 h-16 rounded-lg bg-background-dark flex items-center justify-center overflow-hidden shrink-0 border border-border-dark">
              <img
                src={item.image}
                alt={item.nama}
                className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Content Container */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white truncate text-base">
                  {item.nama}
                </h3>
                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                  chevron_right
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                {item.merk} | {item.kategori}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">
                  Rp {item.formatHarga || item.harga.toLocaleString()}
                  {item.satuan === "Pcs" ? (
                    <span className="text-[10px] text-slate-500 font-normal">
                      {" "}
                      / pcs
                    </span>
                  ) : (
                    ""
                  )}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-wider ${
                    item.status === "Stok Rendah"
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-green-500/20 text-green-500 border border-green-500/30"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* FAB - Fixed Action Button */}
      <button
        onClick={() => navigate("/master/material/add")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>
      {/* PINDAHKAN BOTTOMNAV KE SINI (DI DALAM RETURN) */}
      <BottomNav />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MaterialListPage;
