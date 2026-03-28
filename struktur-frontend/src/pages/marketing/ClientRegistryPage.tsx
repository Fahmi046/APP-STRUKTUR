import React, { useState } from "react";
import { getClients } from "../../api/clientService";
import GenericListPage from "../../components/GenericListPage";

interface Client {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  sumber: string;
  status: string; // prospect, contact, survey, quote, deal, lost
  marketingPic: string;
  ktp?: string;
  npwp?: string;
  alamat?: string;
  created_at: string;
}

const ClientRegistryPage = () => {
  const [segment, setSegment] = useState<"semua" | "lead" | "terdaftar">(
    "semua",
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter kustom
  const customFilter = (data: Client[]) => {
    let filtered = data;
    if (segment === "lead") {
      filtered = filtered.filter(
        (c) => c.status !== "deal" && c.status !== "lost",
      );
    } else if (segment === "terdaftar") {
      filtered = filtered.filter(
        (c) => c.status === "deal" || c.status === "lost",
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }
    return filtered;
  };

  // Mapping status ke kelas statis
  const getStatusStyle = (status: string) => {
    const statusMap: Record<
      string,
      { borderClass: string; badgeClass: string; label: string }
    > = {
      prospect: {
        borderClass: "border-l-blue-500",
        badgeClass: "bg-blue-500/10 border border-blue-500/20 text-blue-400",
        label: "Prospek",
      },
      contact: {
        borderClass: "border-l-yellow-500",
        badgeClass:
          "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400",
        label: "Kontak",
      },
      survey: {
        borderClass: "border-l-purple-500",
        badgeClass:
          "bg-purple-500/10 border border-purple-500/20 text-purple-400",
        label: "Survey",
      },
      quote: {
        borderClass: "border-l-orange-500",
        badgeClass:
          "bg-orange-500/10 border border-orange-500/20 text-orange-400",
        label: "Menawar",
      },
      deal: {
        borderClass: "border-l-emerald-500",
        badgeClass:
          "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
        label: "Deal",
      },
      lost: {
        borderClass: "border-l-red-500",
        badgeClass: "bg-red-500/10 border border-red-500/20 text-red-400",
        label: "Batal",
      },
    };
    return (
      statusMap[status] || {
        borderClass: "border-l-slate-500",
        badgeClass: "bg-slate-500/10 border border-slate-500/20 text-slate-400",
        label: status,
      }
    );
  };

  const getInitials = (nama: string) => {
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isVerified = (client: Client) => !!(client.ktp || client.npwp);

  const renderItem = (client: Client) => {
    const { borderClass, badgeClass, label } = getStatusStyle(client.status);
    const verified = isVerified(client);
    return (
      <div
        className={`bg-card-dark rounded-xl p-4 flex items-center gap-4 group hover:bg-card-dark/80 transition-colors cursor-pointer border-l-2 ${borderClass}`}
      >
        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold border rounded-lg bg-primary/20 text-primary border-primary/10">
          {getInitials(client.nama)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate text-slate-100">
              {client.nama}
            </h3>
            {verified && (
              <span
                className="text-sm material-symbols-outlined text-emerald-400"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            )}
          </div>
          <p className="text-xs truncate text-slate-400">
            {client.email || client.telepon}
          </p>
        </div>
        <div className="text-right">
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${badgeClass}`}
          >
            {label}
          </span>
        </div>
      </div>
    );
  };

  // Mapping untuk status chips (statis)
  const statusChips = [
    {
      key: "prospect",
      label: "Prospek",
      baseClass: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    },
    {
      key: "contact",
      label: "Kontak",
      baseClass: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    },
    {
      key: "survey",
      label: "Survey",
      baseClass: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    },
    {
      key: "quote",
      label: "Menawar",
      baseClass: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    },
    {
      key: "deal",
      label: "Deal",
      baseClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    },
    {
      key: "lost",
      label: "Batal",
      baseClass: "border-red-500/30 bg-red-500/10 text-red-400",
    },
  ];

  const FilterComponent = () => (
    <>
      {/* Segmented Control */}
      <div className="flex items-center p-1 mt-4 bg-card-dark rounded-xl">
        <button
          onClick={() => setSegment("semua")}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${
            segment === "semua"
              ? "text-primary bg-background-dark"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setSegment("lead")}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${
            segment === "lead"
              ? "text-primary bg-background-dark"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Lead
        </button>
        <button
          onClick={() => setSegment("terdaftar")}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${
            segment === "terdaftar"
              ? "text-primary bg-background-dark"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          Terdaftar
        </button>
      </div>

      {/* Status Chips */}
      <div className="flex gap-3 pb-2 mt-4 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setStatusFilter("all")}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all ${
            statusFilter === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-slate-500/30 bg-slate-500/10 text-slate-400"
          }`}
        >
          Semua Status
        </button>
        {statusChips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setStatusFilter(chip.key)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all ${chip.baseClass} ${
              statusFilter === chip.key
                ? `ring-2 ${chip.baseClass.split(" ")[0]}`
                : ""
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <GenericListPage<Client>
      title="Client Registry"
      fetchData={getClients}
      searchFields={(client) => [client.nama, client.email, client.telepon]}
      renderItem={renderItem}
      getItemId={(client) => client.id}
      addPath="/marketing/clients/new"
      basePath="/marketing/clients"
      filterComponent={<FilterComponent />}
      customFilter={customFilter}
    />
  );
};

export default ClientRegistryPage;
