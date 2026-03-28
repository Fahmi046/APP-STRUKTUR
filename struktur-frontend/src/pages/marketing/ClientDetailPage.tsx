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
    navigate(`/marketing/clients/edit/${id}`);
  };

  const handleVerify = () => {
    // Mock verification - replace with API call
    alert("Client verification completed!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-24 bg-background text-on-surface font-body">
        <div className="text-center">
          <p className="text-slate-400">Loading client data...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-24 bg-background text-on-surface font-body">
        <div className="text-center">
          <p className="mb-4 text-red-400">{error || "Client not found"}</p>
          <button
            onClick={handleBack}
            className="transition-colors text-primary hover:text-white"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-background text-on-surface font-body">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 flex items-center justify-between w-full h-16 px-6 border-b bg-surface-container/70 backdrop-blur-xl border-white/5">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="transition-colors text-on-surface hover:text-primary active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight uppercase text-primary font-headline">
            Detail Klien
          </h1>
        </div>
        <button
          onClick={handleEdit}
          className="transition-colors text-primary hover:text-white active:scale-95"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </header>

      <main className="max-w-4xl px-6 pt-24 mx-auto space-y-6">
        {/* Profile Section */}
        <section className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <div className="w-32 h-32 overflow-hidden border-2 shadow-2xl rounded-xl border-primary/20">
              <img
                className="object-cover w-full h-full"
                src={
                  client.avatar ||
                  "https://via.placeholder.com/128x128?text=No+Image"
                }
                alt={`${client.nama} profile`}
              />
            </div>
            {client.verified && (
              <div className="absolute p-1 border-4 rounded-full -bottom-2 -right-2 bg-tertiary text-on-tertiary border-background">
                <span
                  className="text-sm material-symbols-outlined"
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
            <p className="text-sm text-on-surface-variant">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Contact Card */}
          <div className="flex flex-col justify-between p-5 space-y-4 border bg-surface-container rounded-xl border-outline-variant">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Contact Information
              </h3>
              <span className="text-lg material-symbols-outlined text-primary">
                contact_page
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 border rounded bg-surface-container-high border-white/5">
                  <span className="text-sm material-symbols-outlined text-secondary">
                    mail
                  </span>
                </div>
                <span className="text-sm font-medium">{client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 border rounded bg-surface-container-high border-white/5">
                  <span className="text-sm material-symbols-outlined text-secondary">
                    call
                  </span>
                </div>
                <span className="text-sm font-medium">{client.telepon}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 border rounded bg-surface-container-high border-white/5">
                  <span className="text-sm material-symbols-outlined text-secondary">
                    location_on
                  </span>
                </div>
                <span className="text-sm font-medium">{client.alamat}</span>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="p-5 space-y-4 border bg-surface-container rounded-xl border-outline-variant">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Legal Documents
              </h3>
              <span className="text-lg material-symbols-outlined text-primary">
                account_balance_wallet
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg bg-surface-container-high border-white/5">
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
                    <p className="font-mono text-xs">{client.ktp}</p>
                  </div>
                </div>
                <span className="text-sm material-symbols-outlined text-on-surface-variant">
                  visibility
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-surface-container-high border-white/5">
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
                    <p className="font-mono text-xs">{client.npwp}</p>
                  </div>
                </div>
                <span className="text-sm material-symbols-outlined text-on-surface-variant">
                  visibility
                </span>
              </div>
            </div>
          </div>

          {/* Interaction History */}
          <div className="p-5 space-y-4 border bg-surface-container rounded-xl border-outline-variant">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Interaction History
              </h3>
              <span className="text-lg material-symbols-outlined text-primary">
                history
              </span>
            </div>
            <div className="py-8 text-center">
              <p className="text-sm text-slate-400">
                No interaction history available
              </p>
            </div>
          </div>

          {/* Projects Card */}
          <div className="p-5 space-y-4 border bg-surface-container rounded-xl border-outline-variant">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-on-surface-variant tracking-widest uppercase">
                Current Projects
              </h3>
              <span className="text-lg material-symbols-outlined text-primary">
                architecture
              </span>
            </div>
            <div className="py-8 text-center">
              <p className="text-sm text-slate-400">No projects available</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 py-4 text-xs font-bold tracking-widest uppercase transition-all border border-primary text-primary rounded-xl hover:bg-primary hover:text-white active:scale-95"
          >
            <span className="text-lg material-symbols-outlined">edit</span>
            Edit Profile
          </button>
          <button
            onClick={handleVerify}
            className="flex items-center justify-center gap-2 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-primary rounded-xl hover:bg-inverse-primary active:scale-95"
          >
            <span className="text-lg material-symbols-outlined">
              verified_user
            </span>
            Verifikasi
          </button>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 z-50 flex items-center justify-around w-full h-20 border-t bg-surface-container/70 backdrop-blur-xl border-white/5 pb-safe">
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
          className="flex flex-col items-center justify-center transition-colors text-slate-500 hover:text-primary"
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
          className="flex flex-col items-center justify-center transition-colors text-slate-500 hover:text-primary"
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
