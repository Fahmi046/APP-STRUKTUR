import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "./BottomNav";

interface GenericListPageProps<T> {
  title: string;
  fetchData: () => Promise<T[]>;
  searchFields: (item: T) => string[];
  renderItem: (item: T) => React.ReactNode;
  getItemId: (item: T) => string | number;
  addPath: string;
  basePath: string;
  sortBy?: (a: T, b: T) => number;
  limit?: number;
  showBottomNav?: boolean;
  filterComponent?: React.ReactNode; // filter tambahan
  customFilter?: (data: T[]) => T[]; // fungsi filter kustom
}

function GenericListPage<T>({
  title,
  fetchData,
  searchFields,
  renderItem,
  getItemId,
  addPath,
  basePath,
  sortBy = (a, b) =>
    new Date((b as any).created_at).getTime() -
    new Date((a as any).created_at).getTime(),
  limit = 10,
  showBottomNav = true,
  filterComponent,
  customFilter,
}: GenericListPageProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchData();
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(`Gagal load data ${title}:`, error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchData]);

  // Filter berdasarkan pencarian
  const filteredData = (data || []).filter((item) => {
    const lowerQuery = searchQuery.toLowerCase();
    const searchableText = searchFields(item).join(" ").toLowerCase();
    return searchableText.includes(lowerQuery);
  });

  // Terapkan custom filter jika ada
  const finalData = customFilter ? customFilter(filteredData) : filteredData;

  // Sorting dan limit
  const displayedData =
    searchQuery === ""
      ? [...finalData].sort(sortBy).slice(0, limit)
      : finalData;

  return (
    <>
      <header className="sticky top-0 z-20 px-4 pt-6 pb-2 border-b bg-background-light dark:bg-background-dark border-slate-200 dark:border-border-dark">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex gap-2">
            <span className="p-2 cursor-pointer material-symbols-outlined text-slate-400">
              search
            </span>
            <span className="p-2 cursor-pointer material-symbols-outlined text-slate-400">
              tune
            </span>
          </div>
        </div>

        <div className="relative mb-4">
          <span className="absolute text-xl -translate-y-1/2 material-symbols-outlined left-3 top-1/2 text-slate-400">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 pr-4 text-sm border-none outline-none bg-slate-100 dark:bg-card-dark rounded-xl pl-11 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white"
            placeholder={`Cari ${title.toLowerCase()}...`}
          />
        </div>
      </header>

      {/* Filter tambahan */}
      {filterComponent && <div className="px-4 mt-2">{filterComponent}</div>}

      <main className="px-4 py-4 pb-24 space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="w-10 h-10 mb-4 border-b-2 rounded-full animate-spin border-primary"></div>
            <p>Mengambil data dari server...</p>
          </div>
        ) : displayedData.length > 0 ? (
          displayedData.map((item) => (
            <Link
              to={`${basePath}/detail/${getItemId(item)}`}
              key={getItemId(item)}
              className="block"
            >
              {renderItem(item)}
            </Link>
          ))
        ) : (
          <div className="py-20 text-center text-slate-500">
            <span className="text-6xl material-symbols-outlined opacity-20">
              {searchQuery ? "search_off" : "inbox"}
            </span>
            <p className="mt-2">
              {searchQuery
                ? "Tidak ada hasil pencarian."
                : `Belum ada data ${title.toLowerCase()}.`}
            </p>
          </div>
        )}
      </main>

      <Link
        to={addPath}
        className="fixed z-30 flex items-center justify-center text-white transition-transform rounded-full shadow-lg bottom-24 right-6 w-14 h-14 bg-primary shadow-primary/40 active:scale-95"
      >
        <span className="text-3xl material-symbols-outlined">add</span>
      </Link>

      {showBottomNav && <BottomNav />}
    </>
  );
}

export default GenericListPage;
