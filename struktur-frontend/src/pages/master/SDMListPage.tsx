import { Link } from "react-router-dom";
import { MOCK_SDM } from "../../data/sdmStore"; // Menggunakan data terpusat
import BottomNav from "../../components/BottomNav";

const SDMListPage = () => {
  // Kita tidak perlu variabel 'employees' manual lagi di sini.
  // Kita langsung gunakan MOCK_SDM.

  return (
    <>
      <header className="sticky top-0 z-20 bg-background-light dark:bg-background-dark px-4 pt-6 pb-2 border-b border-slate-200 dark:border-border-dark">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Karyawan</h1>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-slate-400 p-2 cursor-pointer">
              search
            </span>
            <span className="material-symbols-outlined text-slate-400 p-2 cursor-pointer">
              tune
            </span>
          </div>
        </div>

        <div className="relative mb-4">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            className="w-full bg-slate-100 dark:bg-card-dark border-none rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Cari nama atau jabatan..."
          />
        </div>
      </header>

      <main className="px-4 py-4 space-y-3 pb-24">
        {/* Mapping data dari MOCK_SDM */}
        {MOCK_SDM.map((emp) => (
          <Link
            to={`/master/sdm/detail/${emp.id}`}
            key={emp.id}
            className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center gap-4 border border-slate-200 dark:border-border-dark shadow-sm active:scale-[0.98] transition-transform"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                emp.status === "Aktif"
                  ? "bg-primary/20 text-primary"
                  : "bg-slate-200 dark:bg-border-dark text-slate-500"
              }`}
            >
              {emp.inisial}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold truncate text-slate-900 dark:text-slate-100">
                  {emp.nama}
                </h3>
                <span
                  className={`text-[10px] uppercase font-bold border px-2 py-0.5 rounded-full ${
                    emp.status === "Aktif"
                      ? "border-green-500 text-green-500"
                      : "border-red-500 text-red-500"
                  }`}
                >
                  {emp.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {emp.jabatan}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {emp.hp}
              </p>
            </div>

            <span className="material-symbols-outlined text-slate-400">
              chevron_right
            </span>
          </Link>
        ))}
      </main>

      <Link
        to="/master/sdm/add"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white z-30 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>
      {/* PINDAHKAN BOTTOMNAV KE SINI (DI DALAM RETURN) */}
      <BottomNav />
    </>
  );
};

export default SDMListPage;
