export interface VendorMaterial {
  id: number;
  nama: string;
  satuan: string;
  harga: number;
}

export interface Vendor {
  id: number;
  nama: string;
  deskripsi: string;
  pic: string;
  hp: string;
  email: string;
  alamat: string;
  npwp: string;
  kategori: "Material" | "Jasa" | "Subkontraktor";
  icon: string;
  totalMaterial: number;
  poAktif: number;
  materials: VendorMaterial[];
}

export const MOCK_VENDOR: Vendor[] = [
  {
    id: 1,
    nama: "PT. Bangun Jaya Sentosa",
    deskripsi: "General Contractor & Supplier",
    pic: "Budi Santoso",
    hp: "+62 812-3456-7890",
    email: "contact@bangunjaya.com",
    alamat: "Jl. Sudirman No. 45, Jakarta Selatan",
    npwp: "01.234.567.8-901.000",
    kategori: "Material",
    icon: "domain",
    totalMaterial: 12,
    poAktif: 5,
    materials: [
      {
        id: 101,
        nama: "Semen Portland Type I",
        satuan: "Sak (50kg)",
        harga: 65000,
      },
      {
        id: 102,
        nama: "Baja Tulangan D13",
        satuan: "Batang (12m)",
        harga: 145000,
      },
    ],
  },
  // Tambahkan mock vendor lain di sini...
];
