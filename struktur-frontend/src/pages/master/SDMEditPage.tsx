import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKaryawanDetail, updateKaryawan } from "../../api/sdmService";
import GenericFormPage from "../../components/GenericFormPage";
import type { FieldConfig } from "../../components/GenericFormPage";
import toast from "react-hot-toast";

const fieldConfigs: FieldConfig[] = [
  {
    name: "nama",
    label: "Nama Lengkap",
    type: "text",
    required: true,
    placeholder: "Masukkan nama lengkap",
  },
  {
    name: "email",
    label: "Email Perusahaan",
    type: "email",
    required: true,
    placeholder: "contoh@perusahaan.com",
  },
  {
    name: "jabatan",
    label: "Jabatan / Posisi",
    type: "select",
    required: true,
    options: [
      { value: "Admin", label: "Admin" },
      { value: "Staff", label: "Staff" },
      { value: "Manager", label: "Manager" },
    ],
  },
  {
    name: "divisi",
    label: "Divisi",
    type: "select",
    required: true,
    options: [
      { value: "Eksekutif", label: "Eksekutif" },
      { value: "Marketing", label: "Marketing" },
      { value: "Engineering", label: "Engineering" },
      { value: "Operasional", label: "Operasional" },
      { value: "Keuangan", label: "Keuangan" },
      { value: "HRD", label: "HRD" },
      { value: "Umum", label: "Umum" },
    ],
  },
  { name: "nip", label: "NIP", type: "text", placeholder: "Contoh: 19920801" },
  {
    name: "status",
    label: "Status Aktif",
    type: "toggle",
    toggleTrueValue: "Aktif",
    toggleFalseValue: "Non-Aktif",
  },
];

const SDMEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({
    nama: "",
    email: "",
    jabatan: "",
    divisi: "Umum",
    nip: "",
    status: "Aktif",
  });
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const data = await getKaryawanDetail(id);
          setInitialData({
            nama: data.nama || "",
            email: data.email || "",
            jabatan: data.jabatan || "",
            divisi: data.divisi || "Umum",
            nip: data.nip || "",
            status: data.status || "Aktif",
          });
          if (data.avatar) {
            setCurrentAvatar(`http://127.0.0.1:8000/storage/${data.avatar}`);
          }
        }
      } catch (error) {
        console.error("Error fetching karyawan:", error);
        toast.error("Gagal memuat data karyawan");
        navigate("/master/sdm");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]);

  const handleUpdate = async (data: any) => {
    if (id) {
      await updateKaryawan(id, data);
    }
  };

  const handleSuccess = () => {
    toast.success("Profil berhasil diperbarui!");
    navigate(`/master/sdm/detail/${id}`);
  };

  const handleCancel = () => {
    navigate(`/master/sdm/detail/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-white bg-background-dark">
        <div className="w-8 h-8 border-4 rounded-full animate-spin border-primary/30 border-t-primary"></div>
        <p className="font-medium text-slate-400">Memuat Data...</p>
      </div>
    );
  }

  return (
    <GenericFormPage
      title="Edit Karyawan"
      fields={fieldConfigs}
      initialData={initialData}
      onSubmit={handleUpdate}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      hasPhotoField
      photoFieldName="avatar"
    />
  );
};

export default SDMEditPage;
