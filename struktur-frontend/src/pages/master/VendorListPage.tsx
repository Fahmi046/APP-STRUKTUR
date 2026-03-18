import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_VENDOR } from "../../data/vendorStore";
import BottomNav from "../../components/BottomNav";

const VendorListPage = () => {
  const [filter, setFilter] = useState("Semua");

  const filteredVendors =
    filter === "Semua"
      ? MOCK_VENDOR
      : MOCK_VENDOR.filter((v) => v.kategori === filter);

  const categories = ["Semua", "Material", "Jasa", "Subkontraktor"];

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
            className="block w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-card-dark border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Cari nama vendor..."
          />
        </div>

        {/* Filter Chips Dinamis */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-slate-100 dark:bg-card-dark text-slate-600 dark:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      <main className="px-4 py-2 space-y-3 pb-24">
        {filteredVendors.map((vendor) => (
          <Link
            to={`/master/vendor/detail/${vendor.id}`}
            key={vendor.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-card-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${vendor.id === 1 ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
              >
                <span className="material-symbols-outlined">{vendor.icon}</span>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-slate-900 dark:text-white leading-tight">
                  {vendor.nama}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {vendor.pic} • {vendor.hp}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400">
              chevron_right
            </span>
          </Link>
        ))}
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
