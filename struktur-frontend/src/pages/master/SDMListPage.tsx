import React from "react";
import { getKaryawan } from "../../api/sdmService";
import GenericListPage from "../../components/GenericListPage";

// Tipe data karyawan (sesuai response API)
interface Karyawan {
  id: number;
  nama: string;
  nip: string;
  jabatan: string;
  divisi: string;
  email: string;
  status: string; // "Aktif", "Cuti", "Non-Aktif"
  avatar: string; // bisa URL lengkap (http...) atau path relatif (avatars/...)
  created_at: string;
  updated_at: string;
}

const SDMListPage = () => {
  const renderItem = (emp: Karyawan) => {
    // Tentukan avatar URL: jika sudah http, langsung; jika tidak, tambah base storage
    const avatarUrl = emp.avatar?.startsWith("http")
      ? emp.avatar
      : `http://127.0.0.1:8000/storage/${emp.avatar}`;

    // Fungsi untuk mengambil inisial nama (2 huruf pertama)
    const getInitials = (nama: string) => {
      return nama
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    };

    // Warna badge berdasarkan status
    const statusBadgeClass =
      emp.status === "Aktif"
        ? "border-green-500/30 text-green-500 bg-green-500/5"
        : emp.status === "Cuti"
          ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/5"
          : "border-red-500/30 text-red-500 bg-red-500/5";

    return (
      <div className="bg-white dark:bg-card-dark rounded-xl p-4 flex items-center gap-4 border border-slate-200 dark:border-border-dark shadow-sm active:scale-[0.98] transition-transform">
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={emp.nama}
            className="object-cover w-12 h-12 rounded-full"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
              emp.status === "Aktif"
                ? "bg-primary/20 text-primary"
                : "bg-slate-200 dark:bg-border-dark text-slate-500"
            }`}
          >
            {getInitials(emp.nama)}
          </div>
        )}

        {/* Informasi */}
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold uppercase truncate text-slate-900 dark:text-slate-100">
              {emp.nama}
            </h3>
            <span
              className={`text-[9px] uppercase font-black border px-2 py-0.5 rounded-md ${statusBadgeClass}`}
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

        {/* Icon chevron */}
        <span className="material-symbols-outlined text-slate-300">
          chevron_right
        </span>
      </div>
    );
  };

  return (
    <GenericListPage<Karyawan>
      title="Karyawan"
      fetchData={getKaryawan}
      searchFields={(emp) => [emp.nama, emp.jabatan, emp.divisi]} // field yang dicari
      renderItem={renderItem}
      getItemId={(emp) => emp.id}
      addPath="/master/sdm/add"
      basePath="/master/sdm"
    />
  );
};

export default SDMListPage;
