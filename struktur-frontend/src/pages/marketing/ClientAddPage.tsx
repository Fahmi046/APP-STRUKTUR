import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createClient } from "../../api/clientService";

const ClientAddPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    sumber: "",
    status: "prospect",
    marketingPic: "",
    ktp: "",
    npwp: "",
    alamat: "",
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.nama.trim()) {
      toast.error("Nama lengkap wajib diisi!");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email wajib diisi!");
      return;
    }

    try {
      setSaving(true);
      await createClient(formData);
      toast.success("Klien berhasil ditambahkan!");
      navigate("/marketing/clients");
    } catch (error: any) {
      console.error("Error saving client:", error);
      const errorMsg = error.response?.data?.message || "Gagal menyimpan klien";
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="min-h-screen pb-24 bg-background text-on-surface">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-[#161B26]/70 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="transition-transform text-slate-400 active:scale-95"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-['Inter'] font-bold text-lg tracking-tight text-primary">
              Tambah Klien
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-colors duration-200"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary hover:bg-inverse-primary text-white font-bold py-2 px-6 rounded-lg active:scale-95 transition-all text-[11px] uppercase tracking-widest disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </header>

        <main className="max-w-2xl px-4 pt-24 mx-auto space-y-6">
          {/* Section Header */}
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Registration Flow
            </span>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white">
              Informasi Klien Baru
            </h2>
          </div>

          <form className="space-y-6">
            {/* Card 1: Contact */}
            <section className="relative p-6 overflow-hidden border shadow-2xl bg-surface-container rounded-xl border-white/5">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  contact_page
                </span>
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-300">
                  Data Kontak
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Nama Lengkap
                  </label>
                  <input
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm rounded-lg input-dark"
                    placeholder="Masukkan nama klien"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Alamat Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm rounded-lg input-dark"
                      placeholder="client@company.com"
                      type="email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Nomor Telepon
                    </label>
                    <input
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm rounded-lg input-dark"
                      placeholder="+62 ..."
                      type="tel"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Sumber Klien
                  </label>
                  <select
                    name="sumber"
                    value={formData.sumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm rounded-lg appearance-none input-dark"
                  >
                    <option value="">Pilih Sumber</option>
                    <option value="ads">Google/FB Ads</option>
                    <option value="referral">Referral</option>
                    <option value="walkin">Walk-in</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Card 2: Status & Assignment */}
            <section className="p-6 border shadow-2xl bg-surface-container rounded-xl border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  assignment_ind
                </span>
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-300">
                  Status & Marketing
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Lead Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm rounded-lg appearance-none input-dark"
                  >
                    <option value="prospect">Prospect</option>
                    <option value="contact">Contacted</option>
                    <option value="survey">Survey</option>
                    <option value="quote">Quote</option>
                    <option value="deal">Deal</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Marketing PIC
                  </label>
                  <select
                    name="marketingPic"
                    value={formData.marketingPic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm rounded-lg appearance-none input-dark"
                  >
                    <option value="">Pilih PIC</option>
                    <option value="user1">Budi Santoso</option>
                    <option value="user2">Siti Aminah</option>
                    <option value="user3">Agus Setiawan</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Card 3: Verification */}
            <section className="p-6 border shadow-2xl bg-surface-container rounded-xl border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">
                  verified_user
                </span>
                <h3 className="text-sm font-bold tracking-widest uppercase text-slate-300">
                  Verifikasi & Identitas
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Nomor KTP (ID)
                    </label>
                    <input
                      name="ktp"
                      value={formData.ktp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm rounded-lg input-dark"
                      placeholder="16-digit nomor KTP"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Nomor NPWP (Tax ID)
                    </label>
                    <input
                      name="npwp"
                      value={formData.npwp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-sm rounded-lg input-dark"
                      placeholder="00.000.000.0-000.000"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Alamat Lengkap
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-sm rounded-lg resize-none input-dark"
                    placeholder="Jl. Arsitektur No. 88..."
                    rows={3}
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 border rounded-lg bg-primary/5 border-primary/10">
                <span className="text-xl material-symbols-outlined text-primary">
                  info
                </span>
                <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-wider">
                  Pastikan seluruh data yang dimasukkan telah sesuai dengan
                  dokumen legal untuk mempercepat proses verifikasi sistem.
                </p>
              </div>
            </div>
          </form>
        </main>

        {/* BottomNavBar */}
        <nav className="fixed bottom-0 left-0 w-full h-20 bg-[#161B26]/70 backdrop-blur-xl border-t border-white/5 flex justify-around items-center pb-safe z-50">
          <a
            className="flex flex-col items-center justify-center transition-all text-slate-500 hover:bg-white/5"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/marketing/clients");
            }}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
              Clients
            </span>
          </a>
          <a
            className="flex flex-col items-center justify-center transition-all text-primary active:scale-90"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              person_add
            </span>
            <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
              Registration
            </span>
          </a>
          <a
            className="flex flex-col items-center justify-center transition-all text-slate-500 hover:bg-white/5"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/marketing");
            }}
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">
              Insights
            </span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default ClientAddPage;
