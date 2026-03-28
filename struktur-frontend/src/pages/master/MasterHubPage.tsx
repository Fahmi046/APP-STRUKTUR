import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
// Ubah baris 3 menjadi:
import BottomNav from "../../components/BottomNav";

const MasterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the exact master hub page
  const isHubPage = location.pathname === "/master";

  const masterModules = [
    {
      id: 1,
      title: "SDM / Karyawan",
      subtitle: "Kelola data staf & tukang",
      icon: "badge",
      color: "from-blue-600 to-indigo-600",
      path: "/master/sdm",
    },
    {
      id: 2,
      title: "Vendor",
      subtitle: "Daftar penyedia material",
      icon: "store",
      color: "from-orange-500 to-amber-600",
      path: "/master/vendor",
    },
    {
      id: 3,
      title: "Material",
      subtitle: "Stok barang & harga satuan",
      icon: "inventory_2",
      color: "from-emerald-500 to-teal-600",
      path: "/master/material",
    },
    {
      id: 4,
      title: "Template",
      subtitle: "SOP, Kontrak & Form Standar",
      icon: "description",
      color: "from-purple-600 to-fuchsia-600",
      path: "/master/template",
    },
  ];

  return (
    <>
      <div className="min-h-screen pb-32 transition-all bg-background-dark text-slate-100 font-display">
        {/* Header Section - only show on hub page */}
        {isHubPage && (
          <>
            <header className="sticky top-0 z-30 px-4 pt-6 pb-4 border-b bg-background-dark/80 backdrop-blur-md border-slate-800">
              <h1 className="text-3xl italic font-bold tracking-tight text-white uppercase">
                Master <span className="not-italic text-primary">Data</span>
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Pusat kendali operasional dan manajemen aset
              </p>
            </header>

            {/* Main Content - only show on hub page */}
            <main className="max-w-2xl p-4 mx-auto space-y-4">
              {/* Grid Modules */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {masterModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => navigate(module.path)}
                    className="relative p-6 overflow-hidden text-left transition-all duration-300 border group rounded-2xl border-slate-800 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 active:scale-95"
                  >
                    {/* Background Gradient Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary">
                          {module.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {module.subtitle}
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br ${module.color} p-3 rounded-xl ml-4 shadow-lg`}
                      >
                        <span className="text-2xl text-white material-symbols-outlined">
                          {module.icon}
                        </span>
                      </div>
                    </div>

                    {/* Hover Decorative Circle */}
                    <div className="absolute w-20 h-20 transition-transform duration-500 rounded-full -bottom-1 -right-1 bg-primary/5 group-hover:scale-150"></div>
                  </button>
                ))}
              </div>

              {/* Info Card - Sinkron dengan style Marketing */}
              <div className="p-6 mt-8 border bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl border-primary/20">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 text-2xl material-symbols-outlined text-primary">
                    info
                  </span>
                  <div>
                    <h3 className="mb-1 font-bold text-white">
                      Pusat Kendali Data
                    </h3>
                    <p className="text-sm text-slate-400">
                      Perubahan pada Master Data akan berpengaruh pada
                      perhitungan RAB, stok logistik, dan laporan absensi secara
                      real-time.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}

        {/* Outlet for child routes (Sub-modul seperti SDM, Vendor, dll) */}
        <div className={!isHubPage ? "p-0" : ""}>
          <Outlet />
        </div>
      </div>

      {/* BottomNav hanya muncul di Hub Page agar tidak bertumpuk di sub-page */}
      {isHubPage && <BottomNav />}
    </>
  );
};

export default MasterPage;
