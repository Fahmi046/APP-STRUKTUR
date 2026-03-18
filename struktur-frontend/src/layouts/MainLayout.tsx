import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const MainLayout = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Isi Halaman Otomatis Muncul di Sini */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Navigasi Bawah Selalu Ada */}
      <BottomNav />
    </div>
  );
};

export default MainLayout;
