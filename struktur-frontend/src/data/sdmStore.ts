export interface Karyawan {
  id: number;
  nama: string;
  inisial: string;
  jabatan: string;
  status: "Aktif" | "Tidak Aktif";
  hp: string;
  alamat: string;
  keahlian: string[];
  jenis: string;
}

export const MOCK_SDM: Karyawan[] = [
  {
    id: 1,
    nama: "Bambang Wijaya",
    inisial: "BW",
    jabatan: "Mandor",
    status: "Aktif",
    hp: "0812-3456-7890",
    alamat: "Jl. Merdeka No. 123, Jakarta Selatan",
    keahlian: ["Struktur", "Beton"],
    jenis: "Tetap",
  },
  {
    id: 2,
    nama: "Siti Aminah",
    inisial: "SA",
    jabatan: "Administrasi",
    status: "Aktif",
    hp: "0855-9988-7766",
    alamat: "Perumahan Indah Blok C, Bekasi",
    keahlian: ["Logistik", "Excel"],
    jenis: "Kontrak",
  },
];
