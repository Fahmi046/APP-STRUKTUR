import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVendor } from "../../api/vendorService";
import BottomNav from "../../components/BottomNav";

const VendorListPage = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Ambil data vendor dari API
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setLoading(true);
        const data = await getVendor();
        setVendors(data);
      } catch (error) {
        console.error("Gagal load data Vendor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, []);

  // 2. Filter vendor berdasarkan pencarian
  const filteredVendors = vendors.filter((vendor) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      vendor.nama.toLowerCase().includes(lowerQuery) ||
      (vendor.alamat && vendor.alamat.toLowerCase().includes(lowerQuery))
    );
  });

  return (
    <>
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold dark:text-white">Vendor</h1>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 p-2">
              search
            </span>
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 p-2">
              tune
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-card-dark border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Cari nama atau alamat vendor..."
          />
        </div>
      </header>
      <main className="px-4 py-2 space-y-3 pb-24">
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <p>Mengambil data dari server...</p>
          </div>
        ) : filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <Link
              to={`/master/vendor/detail/${vendor.id}`}
              key={vendor.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-card-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">business</span>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-slate-900 dark:text-white leading-tight">
                    {vendor.nama}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {vendor.kontak || "-"} • {vendor.alamat || "-"}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400">
                chevron_right
              </span>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 text-slate-500">
            <span className="material-symbols-outlined text-6xl opacity-20">
              domain_disabled
            </span>
            <p className="mt-2">
              {searchQuery
                ? "Tidak ada hasil pencarian."
                : "Belum ada data vendor."}
            </p>
          </div>
        )}
      </main>
      {/* FAB */}
      <Link
        to="/master/vendor/add"
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white z-30 active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>
      {/* PINDAHKAN BOTTOMNAV KE SINI (DI DALAM RETURN) */}
      <BottomNav />
    </>
  );
};

export default VendorListPage;
