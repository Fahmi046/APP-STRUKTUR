import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientDetail, updateClient } from "../../api/clientService";
import toast from "react-hot-toast";

const ClientEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    jabatan: "",
    perusahaan: "",
    alamat: "",
    status: "prospect",
    ktp: "",
    npwp: "",
    verified: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Ambil data lama dari Laravel
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const data = await getClientDetail(id);
          setFormData({
            nama: data.nama || "",
            email: data.email || "",
            telepon: data.telepon || "",
            jabatan: data.jabatan || "",
            perusahaan: data.perusahaan || "",
            alamat: data.alamat || "",
            status: data.status || "prospect",
            ktp: data.ktp || "",
            npwp: data.npwp || "",
            verified: data.verified || false,
          });
          if (data.avatar) {
            setCurrentAvatar(`http://127.0.0.1:8000/storage/${data.avatar}`);
          }
        }
      } catch (error) {
        console.error("Gagal memuat data client:", error);
        toast.error("Gagal memuat data client");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB!");
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Kirim perubahan ke Database dengan Toast
  const handleUpdate = async () => {
    if (!formData.nama || !formData.email) {
      toast.error("Nama dan Email wajib diisi!");
      return;
    }

    try {
      setSaving(true);
      if (id) {
        let updateData: typeof formData | FormData = formData;

        // Jika ada foto baru, kirim dengan FormData
        if (photoFile) {
          const formDataWithFile = new FormData();
          formDataWithFile.append("nama", formData.nama);
          formDataWithFile.append("email", formData.email);
          formDataWithFile.append("telepon", formData.telepon);
          formDataWithFile.append("jabatan", formData.jabatan);
          formDataWithFile.append("perusahaan", formData.perusahaan);
          formDataWithFile.append("alamat", formData.alamat);
          formDataWithFile.append("status", formData.status);
          formDataWithFile.append("ktp", formData.ktp);
          formDataWithFile.append("npwp", formData.npwp);
          formDataWithFile.append("verified", formData.verified.toString());
          formDataWithFile.append("avatar", photoFile);
          updateData = formDataWithFile;
        }

        await updateClient(id, updateData);

        // Notifikasi Sukses
        toast.success("Profil client berhasil diperbarui!");

        navigate(`/marketing/clients/detail/${id}`);
      }
    } catch (error) {
      console.error("Gagal update:", error);
      toast.error(
        (error as Error).response?.data?.message || "Gagal memperbarui data",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-on-surface gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
        <p className="text-slate-400 font-medium">Memuat Data...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background pb-20 text-on-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-container/80 backdrop-blur-md border-b border-outline-variant px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface-variant font-medium hover:text-primary transition-colors"
        >
          Batal
        </button>
        <h1 className="text-lg font-bold text-primary">Edit Client</h1>
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-primary text-on-primary px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {saving ? "..." : "Simpan"}
        </button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Info Header */}
        <div className="bg-surface-container border border-outline-variant p-6 rounded-3xl text-center">
          <div
            onClick={handlePhotoClick}
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-3 border-2 border-dashed border-outline-variant overflow-hidden transition-all hover:border-primary cursor-pointer bg-primary/10"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : currentAvatar ? (
              <img
                src={currentAvatar}
                alt={formData.nama}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-black text-primary">
                {formData.nama.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <p className="text-[10px] text-on-surface-variant uppercase font-bold mt-2">
            {photoPreview ? "Klik untuk ganti foto" : "Klik untuk upload foto"}
          </p>
          <h2 className="font-bold text-on-surface mt-3">
            {formData.nama || "Tanpa Nama"}
          </h2>
          <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1 font-bold">
            {formData.jabatan || "Staff"} |{" "}
            {formData.perusahaan || "Perusahaan"}
          </p>
        </div>

        <section className="space-y-5">
          {/* Input Nama */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Input Email */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan email"
            />
          </div>

          {/* Input Telepon */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Telepon
            </label>
            <input
              type="tel"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          {/* Input Jabatan */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Jabatan
            </label>
            <input
              type="text"
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan jabatan"
            />
          </div>

          {/* Input Perusahaan */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Perusahaan
            </label>
            <input
              type="text"
              name="perusahaan"
              value={formData.perusahaan}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan nama perusahaan"
            />
          </div>

          {/* Input Alamat */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Alamat
            </label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan alamat"
            />
          </div>

          {/* Select Status */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:border-primary focus:outline-none transition-colors"
            >
              <option value="prospect">Prospek</option>
              <option value="contact">Kontak</option>
              <option value="survey">Survey</option>
              <option value="negotiating">Menawar</option>
              <option value="deal">Deal</option>
              <option value="cancelled">Batal</option>
            </select>
          </div>

          {/* Input KTP */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              KTP
            </label>
            <input
              type="text"
              name="ktp"
              value={formData.ktp}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan nomor KTP"
            />
          </div>

          {/* Input NPWP */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-on-surface-variant uppercase ml-1 tracking-wider">
              NPWP
            </label>
            <input
              type="text"
              name="npwp"
              value={formData.npwp}
              onChange={handleChange}
              className="w-full bg-surface-container border border-outline-variant rounded-xl px-4 py-3 text-on-surface placeholder-on-surface-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan nomor NPWP"
            />
          </div>

          {/* Checkbox Verified */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="verified"
              checked={formData.verified}
              onChange={handleChange}
              className="w-4 h-4 text-primary bg-surface-container border-outline-variant rounded focus:ring-primary focus:ring-2"
            />
            <label className="text-sm font-medium text-on-surface">
              Verified
            </label>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientEditPage;
