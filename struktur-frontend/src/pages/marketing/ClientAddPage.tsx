import React, { useState, useEffect } from "react";
import { createClient } from "../../api/clientService";
import GenericFormPage from "../../components/GenericFormPage";
import type { FieldConfig } from "../../components/GenericFormPage";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const ClientAddPage = () => {
  const [marketingOptions, setMarketingOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Fungsi untuk mengambil data marketing PIC
  const getMarketingPics = async () => {
    try {
      const response = await axios.get(`${API_URL}/marketing-pics`);
      console.log("Response:", response.data);

      // Handle berbagai format response
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
      }

      return data;
    } catch (error) {
      console.error("Gagal mengambil data marketing PIC:", error);
      return [];
    }
  };

  // Ambil data marketing PIC dari API
  useEffect(() => {
    const fetchMarketingPics = async () => {
      try {
        setLoadingOptions(true);
        const data = await getMarketingPics();
        setMarketingOptions(data);
      } catch (error) {
        console.error("Error fetching marketing PIC:", error);
        setMarketingOptions([]);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchMarketingPics();
  }, []);

  const initialData = {
    nama: "",
    email: "",
    telepon: "",
    sumber: "",
    status: "prospect",
    marketingPic: "",
    ktp: "",
    npwp: "",
    alamat: "",
  };

  // Field config dengan dynamic options
  const getFieldConfigs = (): FieldConfig[] => [
    {
      name: "nama",
      label: "Nama Lengkap",
      type: "text",
      required: true,
      placeholder: "Masukkan nama lengkap klien",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "client@company.com",
    },
    { name: "telepon", label: "Telepon", type: "tel", placeholder: "+62 ..." },
    {
      name: "sumber",
      label: "Sumber Klien",
      type: "select",
      options: [
        { value: "ads", label: "Google/FB Ads" },
        { value: "referral", label: "Referral" },
        { value: "walkin", label: "Walk-in" },
        { value: "social", label: "Social Media" },
      ],
    },
    {
      name: "status",
      label: "Lead Status",
      type: "select",
      options: [
        { value: "prospect", label: "Prospect" },
        { value: "contact", label: "Contacted" },
        { value: "survey", label: "Survey" },
        { value: "quote", label: "Quote" },
        { value: "deal", label: "Deal" },
        { value: "lost", label: "Lost" },
      ],
    },
    {
      name: "marketingPic",
      label: "Marketing PIC",
      type: "select",
      options: loadingOptions
        ? [{ value: "", label: "Memuat data..." }]
        : marketingOptions.length > 0
          ? marketingOptions
          : [{ value: "", label: "Tidak ada data marketing" }],
    },
    {
      name: "ktp",
      label: "Nomor KTP",
      type: "text",
      placeholder: "16-digit nomor KTP",
    },
    {
      name: "npwp",
      label: "NPWP",
      type: "text",
      placeholder: "00.000.000.0-000.000",
    },
    {
      name: "alamat",
      label: "Alamat Lengkap",
      type: "textarea",
      rows: 3,
      placeholder: "Jl. Arsitektur No. 88...",
    },
  ];

  return (
    <GenericFormPage
      title="Tambah Klien"
      fields={getFieldConfigs()}
      initialData={initialData}
      onSubmit={createClient}
      hasPhotoField
      photoFieldName="avatar"
    />
  );
};

export default ClientAddPage;
