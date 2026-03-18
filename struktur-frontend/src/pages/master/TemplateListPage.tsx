import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";
// MENGGUNAKAN CARA PENGAMBILAN DATA SESUAI PERMINTAAN
import { MOCK_TEMPLATES } from "../../data/templateStore";

const TemplateListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  const filters = ["Semua", "SOP", "Kontrak", "Form", "Lainnya"];

  // Filter data yang diambil dari Store
  const filteredTemplates = MOCK_TEMPLATES.filter((item) => {
    const matchesSearch = item.nama
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "Semua" || item.kategori === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-background-dark font-display text-slate-100 antialiased min-h-screen pb-24">
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/master")}
              className="p-1 -ml-1 text-slate-400 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Template
            </h1>
          </div>
          <div className="flex gap-2">
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
            className="block w-full pl-11 pr-4 py-3 bg-surface-dark border border-border-dark/50 rounded-xl focus:ring-2 focus:ring-primary/50 text-sm placeholder:text-slate-500 transition-all text-white outline-none"
            placeholder="Cari dokumen..."
          />
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === f
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "bg-surface-dark border border-border-dark text-slate-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* List View */}
      <main className="px-4 py-2 space-y-3">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/master/template/detail/${item.id}`)}
              className="flex items-center gap-4 p-4 bg-surface-dark border border-border-dark/60 rounded-2xl shadow-sm active:scale-[0.97] transition-all cursor-pointer hover:border-primary/30 group"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-background-dark flex items-center justify-center shrink-0 border border-border-dark text-primary group-hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-[28px]">
                  {item.icon}
                </span>
              </div>

              {/* Content Container */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-100 truncate text-sm">
                    {item.nama}
                  </h3>
                  <span className="material-symbols-outlined text-slate-600 text-[18px]">
                    chevron_right
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-tight">
                  {item.kategori} <span className="mx-1 text-slate-700">•</span>{" "}
                  {item.versi}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-400 text-[11px] tracking-tighter">
                    {item.size}
                    <span className="text-[10px] text-slate-600 font-normal ml-2 italic">
                      {item.date}
                    </span>
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-black rounded border uppercase tracking-widest ${
                      item.status === "Update"
                        ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        : "bg-green-500/10 text-green-500 border-green-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-800 mb-4">
              find_in_page
            </span>
            <p className="text-slate-500 font-medium">Data tidak ditemukan</p>
          </div>
        )}
      </main>

      {/* FAB - Action Button */}
      <button
        onClick={() => navigate("/master/template/add")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-40"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      <BottomNav />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TemplateListPage;
