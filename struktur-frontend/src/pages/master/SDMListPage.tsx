import React, { useEffect, useState } from "react"; // Tambahkan useEffect & useState
import { Link } from "react-router-dom";
import { getKaryawan } from "../../api/sdmService";
import BottomNav from "../../components/BottomNav";

const SDMListPage = () => {
  // 1. Buat state untuk menampung data dari Laravel
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. Ambil data saat komponen pertama kali muncul
  useEffect(() => {
    const fetchSdm = async () => {
      try {
        setLoading(true);
        const data = await getKaryawan();
        setAllEmployees(data);
      } catch (error) {
        console.error("Gagal load data SDM:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSdm();
  }, []);

  // 3. Filter data berdasarkan search query
  const filteredEmployees = allEmployees.filter((emp) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      emp.nama.toLowerCase().includes(lowerQuery) ||
      emp.jabatan.toLowerCase().includes(lowerQuery) ||
      emp.divisi.toLowerCase().includes(lowerQuery)
    );
  });

  // 4. Tampilkan 10 terbaru (diurutkan berdasarkan created_at) jika tidak ada search, semua hasil jika ada search
  const displayedEmployees =
    searchQuery === ""
      ? [...filteredEmployees]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .slice(0, 10)
      : filteredEmployees;

  // Fungsi pembantu untuk inisial (karena di DB mungkin tidak ada kolom inisial)
  const getInisial = (nama: string) => {
    return nama
      ? nama
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "??";
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-card-dark border-none rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
            placeholder="Cari nama atau jabatan..."
          />
        </div>
      </header>

      <main className="px-4 py-4 space-y-3 pb-24">
        {/* 3. Tampilkan Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p>Mengambil data dari server...</p>
          </div>
        ) : displayedEmployees.length > 0 ? (
          // 4. Mapping data asli dari Laravel
          displayedEmployees.map((emp) => (
            <Link
              to={`/master/sdm/detail/${emp.id}`}
              key={emp.id}
              className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center gap-4 border border-slate-200 dark:border-border-dark shadow-sm active:scale-[0.98] transition-transform"
            >
              {/* Cek jika ada avatar URL, tampilkan gambar. Jika tidak, tampilkan inisial */}
              {emp.avatar ? (
                <img
                  src={`http://127.0.0.1:8000/storage/${emp.avatar}`}
                  alt={emp.nama}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    emp.status === "Aktif"
                      ? "bg-primary/20 text-primary"
                      : "bg-slate-200 dark:bg-border-dark text-slate-500"
                  }`}
                >
                  {getInisial(emp.nama)}
                </div>
              )}

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold truncate text-slate-900 dark:text-slate-100 uppercase text-sm">
                    {emp.nama}
                  </h3>
                  <span
                    className={`text-[9px] uppercase font-black border px-2 py-0.5 rounded-md ${
                      emp.status === "Aktif"
                        ? "border-green-500/30 text-green-500 bg-green-500/5"
                        : "border-red-500/30 text-red-500 bg-red-500/5"
                    }`}
                  >
                    {emp.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {emp.jabatan} • {emp.divisi}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  NIP: {emp.nip || "-"}
                </p>
              </div>

              <span className="material-symbols-outlined text-slate-300">
                chevron_right
              </span>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-slate-500">
            <span className="material-symbols-outlined text-6xl opacity-20">
              group_off
            </span>
            <p className="mt-2">
              {searchQuery
                ? "Tidak ada hasil pencarian."
                : "Belum ada data karyawan."}
            </p>
          </div>
        )}
      </main>

      <Link
        to="/master/sdm/add"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white z-30 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>

      <BottomNav />
    </>
  );
};

export default SDMListPage;
