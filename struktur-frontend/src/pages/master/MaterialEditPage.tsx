import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialDetail, updateMaterial } from "../../api/materialService";
import toast from "react-hot-toast";
import BottomNav from "../../components/BottomNav";

const MaterialEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    merk: "",
    tipe: "",
    harga: "",
    satuan: "pcs",
    stok: "",
    min_stok: "5",
    vendor: "",
  });

  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch detail untuk pre-fill form
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getMaterialDetail(id as string);
        setFormData({
          nama: data.nama || "",
          kategori: data.kategori || "",
          merk: data.merk || "",
          tipe: data.tipe || "",
          harga: data.harga ? data.harga.toString() : "",
          satuan: data.satuan || "pcs",
          stok: data.stok ? data.stok.toString() : "",
          min_stok: data.min_stok ? data.min_stok.toString() : "5",
          vendor: data.vendor || "",
        });

        // Set current image if exists
        if (data.image) {
          setCurrentImage(`http://127.0.0.1:8000/storage/${data.image}`);
        }
      } catch (error) {
        console.error("Gagal load data:", error);
        toast.error("Gagal memuat data material.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar!");
      return;
    }

    // Validasi ukuran file (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Ukuran gambar tidak boleh lebih dari 5MB!");
      return;
    }

    // Set photo file dan preview
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.nama) {
      toast.error("Nama Material wajib diisi!");
      return;
    }

    try {
      setSaving(true);

      if (photoFile) {
        // Send as FormData if there's a new photo
        const formDataToSend = new FormData();
        formDataToSend.append("nama", formData.nama);
        formDataToSend.append("kategori", formData.kategori || "");
        formDataToSend.append("merk", formData.merk || "");
        formDataToSend.append("tipe", formData.tipe || "");
        formDataToSend.append(
          "harga",
          formData.harga ? parseFloat(formData.harga).toString() : "0",
        );
        formDataToSend.append("satuan", formData.satuan || "pcs");
        formDataToSend.append(
          "stok",
          formData.stok ? parseInt(formData.stok).toString() : "0",
        );
        formDataToSend.append(
          "min_stok",
          formData.min_stok ? parseInt(formData.min_stok).toString() : "5",
        );
        formDataToSend.append("vendor", formData.vendor || "");
        formDataToSend.append("image", photoFile);
        formDataToSend.append("_method", "PUT");

        await updateMaterial(id as string, formDataToSend);
      } else {
        // Send as JSON if no new photo
        const dataToSend = {
          ...formData,
          harga: formData.harga ? parseFloat(formData.harga) : 0,
          stok: formData.stok ? parseInt(formData.stok) : 0,
          min_stok: formData.min_stok ? parseInt(formData.min_stok) : 5,
        };

        await updateMaterial(id as string, dataToSend);
      }

      toast.success("Material berhasil diupdate!");
      navigate(`/master/material/detail/${id}`);
    } catch (error: any) {
      console.error("Gagal simpan:", error);
      toast.error(
        error.response?.data?.message || "Terjadi kesalahan saat menyimpan.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center text-slate-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4 mx-auto"></div>
          <p>Mengambil data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background-dark text-slate-100 font-display pb-32">
        {/* Header - Sticky di atas layar */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-background-dark/80 backdrop-blur-lg border-b border-slate-800">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 font-medium text-sm hover:text-white transition-colors"
          >
            Batal
          </button>
          <h1 className="text-white text-lg font-bold">Edit Material</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {saving ? "..." : "Simpan"}
          </button>
        </header>

        {/* Main Content - Scroll Mengikuti Body */}
        <main className="p-4 space-y-6 max-w-md mx-auto">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          {/* Card 0: Photo Upload */}
          <section className="bg-card-dark p-5 rounded-xl border border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-primary text-xl">
                image
              </span>
              Foto Material
            </h3>
            <div className="relative w-full aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center overflow-hidden border border-slate-700">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : currentImage ? (
                <img
                  src={currentImage}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-slate-600 text-5xl">
                  image
                </span>
              )}
            </div>
            <button
              onClick={handlePhotoClick}
              className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                {photoPreview ? "edit" : "add_a_photo"}
              </span>
              {photoPreview ? "Ganti Foto" : "Upload Foto"}
            </button>
          </section>

          {/* Card 1: Informasi Dasar */}
          <section className="bg-card-dark p-5 rounded-xl border border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-primary text-xl">
                info
              </span>
              Informasi Dasar
            </h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Nama Material
              </label>
              <input
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="Contoh: Semen Portland 50kg"
                type="text"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Kategori
              </label>
              <div className="relative">
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-full appearance-none bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Bahan Bangunan">Bahan Bangunan</option>
                  <option value="Alat Listrik">Alat Listrik</option>
                  <option value="Pipa Sanitasi">Pipa & Sanitasi</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-3 pointer-events-none text-slate-500">
                  expand_more
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                  Merk
                </label>
                <input
                  name="merk"
                  value={formData.merk}
                  onChange={handleChange}
                  className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Merk"
                  type="text"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                  Tipe
                </label>
                <input
                  name="tipe"
                  value={formData.tipe}
                  onChange={handleChange}
                  className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Tipe"
                  type="text"
                />
              </div>
            </div>
          </section>

          {/* Card 2: Harga & Stok */}
          <section className="bg-card-dark p-5 rounded-xl border border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              <span className="material-symbols-outlined text-primary text-xl">
                payments
              </span>
              Harga & Stok
            </h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Harga Satuan
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500 font-medium">
                  Rp
                </span>
                <input
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl pl-12 pr-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="0"
                  type="number"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                  Stok Gudang
                </label>
                <input
                  name="stok"
                  value={formData.stok}
                  onChange={handleChange}
                  className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0"
                  type="number"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                  Min. Stok
                </label>
                <input
                  name="min_stok"
                  value={formData.min_stok}
                  onChange={handleChange}
                  className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                  placeholder="5"
                  type="number"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Satuan
              </label>
              <input
                name="satuan"
                value={formData.satuan}
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="pcs"
                type="text"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 px-1 uppercase tracking-tight">
                Vendor
              </label>
              <input
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full bg-background-dark border-slate-800 text-slate-100 rounded-xl px-4 py-3 focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Nama Vendor"
                type="text"
              />
            </div>
          </section>
        </main>
      </div>
      <BottomNav />
    </>
  );
};

export default MaterialEditPage;
