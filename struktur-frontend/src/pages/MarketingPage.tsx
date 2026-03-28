import React from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const MarketingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the exact marketing hub page
  const isHubPage = location.pathname === "/marketing";

  const marketingModules = [
    {
      id: 1,
      title: "Kampanye",
      subtitle: "Kelola prospek pelanggan",
      icon: "group",
      color: "from-orange-500 to-red-500",
      path: "/marketing/clients",
    },
    {
      id: 2,
      title: "Leads",
      subtitle: "Kelola prospek pelanggan",
      icon: "people",
      color: "from-blue-500 to-cyan-500",
      path: "/marketing/leads",
    },
    {
      id: 3,
      title: "Email",
      subtitle: "Kelola email marketing",
      icon: "mail",
      color: "from-purple-500 to-pink-500",
      path: "/marketing/email",
    },
    {
      id: 4,
      title: "Analytics",
      subtitle: "Analisis performa pemasaran",
      icon: "trending_up",
      color: "from-green-500 to-emerald-500",
      path: "/marketing/analytics",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-background-dark text-slate-100 font-display pb-32">
        {/* Header Section - only show on hub page */}
        {isHubPage && (
          <>
            <header className="sticky top-0 z-30 bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-4 border-b border-slate-800">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Marketing
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Kelola semua aktivitas pemasaran Anda
              </p>
            </header>

            {/* Main Content - only show on hub page */}
            <main className="p-4 space-y-4 max-w-2xl mx-auto">
              {/* Grid Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketingModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => navigate(module.path)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800 p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 active:scale-95"
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    {/* Content */}
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-sm text-slate-400 mt-1">
                          {module.subtitle}
                        </p>
                      </div>
                      <div
                        className={`bg-gradient-to-br ${module.color} p-3 rounded-xl ml-4`}
                      >
                        <span className="material-symbols-outlined text-white text-2xl">
                          {module.icon}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute -bottom-1 -right-1 h-20 w-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                  </button>
                ))}
              </div>

              {/* Info Card */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-2xl border border-primary/20">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0">
                    lightbulb
                  </span>
                  <div>
                    <h3 className="font-bold text-white mb-1">
                      Tips Marketing
                    </h3>
                    <p className="text-sm text-slate-400">
                      Manfaatkan setiap modul untuk memaksimalkan jangkauan dan
                      konversi pemasaran Anda.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </>
        )}

        {/* Outlet for child routes */}
        <Outlet />
      </div>
      {isHubPage && <BottomNav />}
    </>
  );
};

export default MarketingPage;
