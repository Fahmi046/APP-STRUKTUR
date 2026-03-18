import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

const MasterHubPage = () => {
  const navigate = useNavigate();

  const menus = [
    {
      title: "SDM / Karyawan",
      icon: "badge",
      path: "/master/sdm",
      color: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/20",
      desc: "Kelola data tukang & staf",
    },
    {
      title: "Vendor & Supplier",
      icon: "store",
      path: "/master/vendor",
      color: "from-orange-600 to-orange-400",
      shadow: "shadow-orange-500/20",
      desc: "Daftar penyedia material",
    },
    {
      title: "Inventaris Material",
      icon: "inventory_2",
      path: "/master/material",
      color: "from-emerald-600 to-emerald-400",
      shadow: "shadow-emerald-500/20",
      desc: "Stok barang & harga satuan",
    },
    {
      title: "Template Dokumen",
      icon: "inventory",
      path: "/master/template",
      color: "from-purple-600 to-purple-400",
      shadow: "shadow-purple-500/20",
      desc: "SOP, Kontrak, & Form standar",
    },
  ];

  return (
    // Kita gunakan Fragment <> atau pembungkus div utama
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 pb-32 transition-colors">
      {/* Header Section */}
      <header className="mb-10 mt-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
          Master <span className="text-primary not-italic">Data</span>
        </h1>
        <div className="h-1 w-12 bg-primary mt-2 rounded-full"></div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium">
          Pusat kendali operasional dan manajemen aset proyek Anda.
        </p>
      </header>

      {/* Grid Menu */}
      <div className="grid gap-5">
        {menus.map((menu, i) => (
          <button
            key={i}
            onClick={() => navigate(menu.path)}
            className="flex items-center gap-5 p-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm active:scale-[0.97] transition-all text-left group relative overflow-hidden"
          >
            <div
              className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${menu.color} opacity-0 group-hover:opacity-100 transition-opacity`}
            ></div>

            <div
              className={`bg-gradient-to-br ${menu.color} size-16 rounded-2xl flex items-center justify-center text-white shadow-xl ${menu.shadow} transition-transform group-hover:rotate-6 group-hover:scale-110`}
            >
              <span className="material-symbols-outlined text-3xl font-light leading-none">
                {menu.icon}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight transition-colors group-hover:text-primary">
                {menu.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                {menu.desc}
              </p>
            </div>

            <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 transition-all group-hover:bg-primary group-hover:text-white group-hover:translate-x-1">
              <span className="material-symbols-outlined text-xl">
                chevron_right
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Info Footer Hub */}
      <div className="mt-10 p-6 rounded-3xl bg-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 text-primary mb-2">
          <span className="material-symbols-outlined">info</span>
          <span className="font-bold text-xs uppercase tracking-widest">
            Pusat Bantuan
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
          Semua perubahan pada Master Data akan berpengaruh pada laporan
          inventaris dan absensi secara real-time.
        </p>
      </div>

      {/* PINDAHKAN BOTTOMNAV KE SINI (DI DALAM RETURN) */}
      <BottomNav />
    </div>
  );
};

export default MasterHubPage;
