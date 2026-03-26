import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Client {
  id: number;
  nama: string;
  email: string;
  telepon?: string;
  sumber?: string;
  status: string;
  marketing_pic?: string;
  ktp?: string;
  npwp?: string;
  alamat?: string;
  verified: boolean;
  jabatan?: string;
  perusahaan?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

const ClientDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch client data from API
  useEffect(() => {
    if (id) {
      fetchClient(id);
    }
  }, [id]);

  const fetchClient = async (clientId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/client/${clientId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setClient(data);
      } else {
        setError("Client not found");
      }
    } catch (error) {
      console.error("Error fetching client:", error);
      setError("Failed to load client data");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/marketing/clients");
  };

  const handleEdit = () => {
    // Mock edit - replace with navigation to edit page when created
    alert("Edit functionality coming soon!");
  };

  const handleVerify = () => {
    // Mock verification - replace with API call
    alert("Client verification completed!");
  };

  if (loading) {
    return (
      <div className="bg-background text-on-surface font-body min-h-screen pb-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Loading client data...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="bg-background text-on-surface font-body min-h-screen pb-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || "Client not found"}</p>
          <button
            onClick={handleBack}
            className="text-primary hover:text-white transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container/70 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="text-on-surface hover:text-primary transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-primary font-headline font-bold text-lg tracking-tight uppercase">
            Detail Klien
          </h1>
        </div>
        <button
          onClick={handleEdit}
          className="text-primary hover:text-white transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      <main className="pt-24 px-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-primary/20 shadow-2xl">
              <img
                className="w-full h-full object-cover"
                src={
                  client.avatar ||
                  "https://via.placeholder.com/128x128?text=No+Image"
                }
                alt={`${client.nama} profile`}
              />
            </div>
            {client.verified && (
              <div className="absolute -bottom-2 -right-2 bg-tertiary text-on-tertiary rounded-full p-1 border-4 border-background">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">
              {client.nama}
            </h2>
            <p className="text-on-surface-variant text-sm">
              {client.jabatan || "No position"} |{" "}
              {client.perusahaan || "No company"}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-primary-container text-primary border border-primary/20 rounded-full text-[10px] font-bold tracking-widest uppercase">
              {client.status.toUpperCase()}
            </span>
            {client.verified && (
              <span className="px-3 py-1 bg-tertiary-container text-tertiary border border-tertiary/20 rounded-full text-[10px] font-bold tracking-widest uppercase">
                VERIFIED
              </span>
            )}
          </div>
        </section>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Card */}
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Contact Information
              </h3>
              <span className="material-symbols-outlined text-primary text-lg">
                contact_page
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center border border-white/5">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    mail
                  </span>
                </div>
                <span className="text-sm font-medium">{client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center border border-white/5">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    call
                  </span>
                </div>
                <span className="text-sm font-medium">{client.telepon}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center border border-white/5">
                  <span className="material-symbols-outlined text-sm text-secondary">
                    location_on
                  </span>
                </div>
                <span className="text-sm font-medium">{client.alamat}</span>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Legal Documents
              </h3>
              <span className="material-symbols-outlined text-primary text-lg">
                account_balance_wallet
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-surface-container-high rounded-lg border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                      KTP
                    </p>
                    <p className="text-xs font-mono">{client.ktp}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">
                  visibility
                </span>
              </div>
              <div className="p-3 bg-surface-container-high rounded-lg border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-tertiary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                      NPWP
                    </p>
                    <p className="text-xs font-mono">{client.npwp}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-sm">
                  visibility
                </span>
              </div>
            </div>
          </div>

          {/* Interaction History */}
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Interaction History
              </h3>
              <span className="material-symbols-outlined text-primary text-lg">
                history
              </span>
            </div>
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">
                No interaction history available
              </p>
            </div>
          </div>

          {/* Projects Card */}
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Current Projects
              </h3>
              <span className="material-symbols-outlined text-primary text-lg">
                architecture
              </span>
            </div>
            <div className="text-center py-8">
              <p className="text-slate-400 text-sm">No projects available</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 py-4 border border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            Edit Profile
          </button>
          <button
            onClick={handleVerify}
            className="flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-xl hover:bg-inverse-primary transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            <span className="material-symbols-outlined text-lg">
              verified_user
            </span>
            Verifikasi
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center bg-surface-container/70 backdrop-blur-xl border-t border-white/5 pb-safe z-50">
        <a
          className="flex flex-col items-center justify-center text-primary"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/marketing/clients");
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            group
          </span>
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest mt-1">
            Clients
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-slate-500 hover:text-primary transition-colors"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/marketing/clients/new");
          }}
        >
          <span className="material-symbols-outlined">person_add</span>
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest mt-1">
            Registration
          </span>
        </a>
        <a
          className="flex flex-col items-center justify-center text-slate-500 hover:text-primary transition-colors"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-headline text-[10px] font-bold uppercase tracking-widest mt-1">
            Insights
          </span>
        </a>
      </nav>
    </div>
  );
};

export default ClientDetailPage;
