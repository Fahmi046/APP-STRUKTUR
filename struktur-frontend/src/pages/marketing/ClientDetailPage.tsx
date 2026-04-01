import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
      toast.error("Gagal memuat data klien");
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
    toast.success("Verifikasi klien berhasil!");
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await fetch(`http://localhost:8000/api/client/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast.success("Klien berhasil dihapus!");
        navigate("/marketing/clients");
      } else {
        const error = await response.json();
        toast.error(error.message || "Gagal menghapus klien");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      toast.error("Gagal menghapus klien. Periksa koneksi ke server.");
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Fungsi untuk mendapatkan inisial nama (maksimal 2 huruf)
  const getInitials = (nama: string) => {
    if (!nama) return "??";
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Fungsi untuk mendapatkan URL avatar
  const getAvatarUrl = (avatar?: string) => {
    if (!avatar) return null;
    if (avatar.startsWith("http")) return avatar;
    return `http://127.0.0.1:8000/storage/${avatar}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-24 bg-background text-on-surface font-body">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-4 rounded-full border-primary/30 border-t-primary animate-spin"></div>
          <p className="text-slate-400">Memuat data klien...</p>
        </div>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="flex items-center justify-center min-h-screen pb-24 bg-background text-on-surface font-body">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-red-400 mb-4">
            error_outline
          </span>
          <p className="mb-4 text-red-400">{error || "Client not found"}</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 transition-colors rounded-lg text-primary hover:bg-primary/10"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const avatarUrl = getAvatarUrl(client.avatar);
  const initials = getInitials(client.nama);

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
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="transition-colors text-primary hover:text-white active:scale-95 p-2"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="transition-colors text-red-400 hover:text-red-300 active:scale-95 p-2"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </header>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm p-6 border rounded-2xl bg-surface-container border-white/5">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-500/10 rounded-full">
              <span className="text-2xl material-symbols-outlined text-red-400">
                warning
              </span>
            </div>
            <h3 className="mb-2 text-lg font-bold text-center text-white">
              Hapus Klien?
            </h3>
            <p className="mb-6 text-sm text-center text-slate-400">
              Apakah Anda yakin ingin menghapus klien{" "}
              <span className="font-semibold text-white">{client.nama}</span>?
              <br />
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 text-sm font-bold transition-all rounded-lg text-slate-300 bg-slate-800 hover:bg-slate-700 active:scale-95"
                disabled={deleting}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 text-sm font-bold text-white transition-all bg-red-500 rounded-lg hover:bg-red-600 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl px-6 pt-24 mx-auto space-y-6">
        {/* Profile Section */}
        <section className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <div className="w-32 h-32 overflow-hidden border-2 shadow-2xl rounded-xl border-primary/20 bg-surface-container-high flex items-center justify-center">
              {avatarUrl ? (
                <img
                  className="object-cover w-full h-full"
                  src={avatarUrl}
                  alt={`${client.nama} profile`}
                  onError={(e) => {
                    // Jika gambar gagal dimuat, fallback ke inisial
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                        ${initials}
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary bg-gradient-to-br from-primary/20 to-primary/10">
                  {initials}
                </div>
              )}
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
          <div className="flex gap-2 flex-wrap justify-center">
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

        {/* Bento Grid Content - Same as before */}
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
                <span className="text-sm font-medium">
                  {client.telepon || "-"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 border rounded bg-surface-container-high border-white/5">
                  <span className="text-sm material-symbols-outlined text-secondary">
                    location_on
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {client.alamat || "-"}
                </span>
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
                    <p className="font-mono text-xs">{client.ktp || "-"}</p>
                  </div>
                </div>
                {client.ktp && (
                  <span className="text-sm material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
                    visibility
                  </span>
                )}
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
                    <p className="font-mono text-xs">{client.npwp || "-"}</p>
                  </div>
                </div>
                {client.npwp && (
                  <span className="text-sm material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary">
                    visibility
                  </span>
                )}
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
              <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">
                chat_bubble_outline
              </span>
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
              <span className="material-symbols-outlined text-4xl text-slate-600 mb-2">
                construction
              </span>
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
