import React from "react";
import { createKaryawan } from "../../api/sdmService";
import GenericFormPage from "../../components/GenericFormPage";
import type { FieldConfig } from "../../components/GenericFormPage";

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
      { value: "Umum", label: "Umum" },
      { value: "Operasional", label: "Operasional" },
      { value: "Konstruksi", label: "Konstruksi" },
      { value: "SDM", label: "SDM" },
      { value: "Finance", label: "Finance" },
      { value: "Marketing", label: "Marketing" },
      { value: "Engineering", label: "Engineering" },
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

const SDMAddPage = () => {
  const initialData = {
    nama: "",
    email: "",
    jabatan: "",
    divisi: "Umum", // default value
    nip: "",
    status: "Aktif",
  };

  return (
    <GenericFormPage
      title="Tambah Karyawan"
      fields={fieldConfigs}
      initialData={initialData}
      onSubmit={createKaryawan}
      hasPhotoField
      photoFieldName="avatar"
    />
  );
};

export default SDMAddPage;
