import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

interface Client {
  id: number;
  nama: string;
  email: string;
  telepon?: string;
  status:
    | "prospect"
    | "contact"
    | "survey"
    | "negotiating"
    | "deal"
    | "cancelled";
  verified: boolean;
  jabatan?: string;
  perusahaan?: string;
}

const ClientRegistryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients from API
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/client");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transform status for display
  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, string> = {
      prospect: "Prospek",
      contact: "Kontak",
      survey: "Survey",
      negotiating: "Menawar",
      deal: "Deal",
      cancelled: "Batal",
    };
    return statusMap[status] || status;
  };

  // Get avatar color based on status
  const getAvatarColor = (status: string) => {
    const colors: Record<string, string> = {
      prospect: "bg-blue-500/20",
      contact: "bg-yellow-500/20",
      survey: "bg-purple-500/20",
      negotiating: "bg-orange-500/20",
      deal: "bg-emerald-500/20",
      cancelled: "bg-red-500/20",
    };
    return colors[status] || colors.prospect;
  };

  // Get border color based on status
  const getBorderColor = (status: string) => {
    const colors: Record<string, string> = {
      prospect: "border-blue-500",
      contact: "border-yellow-500",
      survey: "border-purple-500",
      negotiating: "border-orange-500",
      deal: "border-emerald-500",
      cancelled: "border-red-500",
    };
    return colors[status] || colors.prospect;
  };

  const statusChips = [
    "prospect",
    "contact",
    "survey",
    "negotiating",
    "deal",
    "cancelled",
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> =
      {
        prospect: {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          text: "text-blue-400",
        },
        contact: {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
        },
        survey: {
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
          text: "text-purple-400",
        },
        negotiating: {
          bg: "bg-orange-500/10",
          border: "border-orange-500/30",
          text: "text-orange-400",
        },
        deal: {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          text: "text-emerald-400",
        },
        cancelled: {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          text: "text-red-400",
        },
      };
    return colors[status] || colors.prospect;
  };

  const getInitialsColor = (status: string) => {
    const colors: Record<string, string> = {
      prospect: "text-blue-400",
      contact: "text-yellow-400",
      survey: "text-purple-400",
      negotiating: "text-orange-400",
      deal: "text-emerald-400",
      cancelled: "text-red-400",
    };
    return colors[status] || colors.prospect;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase() || "")
      .join("");
  };

  const filteredClients = clients.filter((client) => {
    const nama = client.nama ? client.nama.toLowerCase() : "";
    const telepon = client.telepon ? client.telepon.toLowerCase() : "";
    const matchesSearch =
      nama.includes(searchQuery.toLowerCase()) ||
      telepon.includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="bg-background text-on-background min-h-screen pb-24">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-surface-container-low/70 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 h-16">
          <div className="flex items-center gap-4">
            <button className="text-primary active:scale-95 transition-transform">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-primary font-black tracking-tighter text-xl uppercase">
              Client Registry
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container border border-primary/20 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-linear-to-br from-primary to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 px-4 max-w-2xl mx-auto">
          {/* Segmented Control */}
          <div className="mt-4 bg-surface-container-low p-1 rounded-xl flex items-center">
            {["Semua", "Lead", "Terdaftar"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                  activeTab === tab
                    ? "text-primary bg-surface-container-highest"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Horizontal Status Chips */}
          <div className="mt-6 flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {statusChips.map((status) => {
              const colors = getStatusColor(status);
              return (
                <button
                  key={status}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full border ${colors.border} ${colors.bg} ${colors.text} text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all`}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {/* Client List */}
          <div className="mt-6 space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-slate-400">Loading clients...</p>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">No clients found</p>
              </div>
            ) : (
              filteredClients.map((client) => {
                const statusColor = getStatusColor(client.status);
                const initialsColor = getInitialsColor(client.status);
                const avatarColor = getAvatarColor(client.status);
                const borderColor = getBorderColor(client.status);

                return (
                  <div
                    key={client.id}
                    onClick={() => navigate(`/marketing/clients/${client.id}`)}
                    className={`bg-surface-container rounded-xl p-4 flex items-center gap-4 group hover:bg-surface-container-high transition-colors cursor-pointer border-l-2 ${borderColor}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg ${avatarColor} flex items-center justify-center ${initialsColor} font-bold text-lg border ${borderColor}/10`}
                    >
                      {getInitials(client.nama)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-on-surface font-semibold truncate">
                          {client.nama}
                        </h3>
                        {client.verified && (
                          <>
                            <span
                              className="material-symbols-outlined text-emerald-400 text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-emerald-400">
                              Terverifikasi
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-400 text-xs truncate">
                        {client.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-0.5 rounded border ${statusColor.border} ${statusColor.bg} ${statusColor.text} text-[9px] font-black uppercase tracking-widest`}
                      >
                        {getStatusDisplay(client.status)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </main>

        {/* Floating Action Button */}
        <button
          onClick={() => navigate("/marketing/clients/new")}
          className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-xl shadow-2xl flex items-center justify-center text-white active:scale-90 transition-all z-40 border border-white/10"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
      <BottomNav />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ClientRegistryPage;
