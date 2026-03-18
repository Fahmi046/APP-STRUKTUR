import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#121826] border-t border-slate-100 dark:border-slate-800 px-2 pb-6 pt-2 z-40 flex justify-around items-center">
      {/* Beranda / Dashboard */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            isActive ? "text-primary" : "text-slate-400"
          }`
        }
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px] font-medium">Dashboard</span>
      </NavLink>

      {/* Projects / Proyek */}
      <NavLink
        to="/master/proyek"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            isActive ? "text-primary active-link" : "text-slate-400"
          }`
        }
      >
        {/* Perbaikan: Menggunakan CSS class untuk mengatur Fill agar tidak bentrok dengan JS scope */}
        <span className="material-symbols-outlined icon-fillable">
          view_kanban
        </span>
        <span className="text-[10px] font-medium">Projects</span>
      </NavLink>

      {/* Master Data */}
      <NavLink
        to="/master"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            isActive ? "text-primary" : "text-slate-400"
          }`
        }
      >
        <span className="material-symbols-outlined">
          account_balance_wallet
        </span>
        <span className="text-[10px] font-medium">Master</span>
      </NavLink>

      {/* Reports / Laporan */}
      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-3 transition-colors ${
            isActive ? "text-primary" : "text-slate-400"
          }`
        }
      >
        <span className="material-symbols-outlined">bar_chart_4_bars</span>
        <span className="text-[10px] font-medium">Reports</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
