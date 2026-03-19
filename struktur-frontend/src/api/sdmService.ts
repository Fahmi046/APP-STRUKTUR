import axios from "axios";

// Sesuaikan URL dengan nama project di Laragon Anda
const API_URL = "http://127.0.0.1:8000/api";

// 1. Ambil Semua Data Karyawan
export const getKaryawan = async () => {
  try {
    const response = await axios.get(`${API_URL}/sdm`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data SDM:", error);
    throw error;
  }
};

// 2. Ambil Detail Karyawan berdasarkan ID
export const getKaryawanDetail = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/sdm/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail SDM:", error);
    throw error;
  }
};

// 3. Tambah Karyawan Baru
export const createKaryawan = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/sdm`, data);
    return response.data;
  } catch (error) {
    console.error("Gagal menambah SDM:", error);
    throw error;
  }
};

// 4. Update/Edit Data Karyawan
export const updateKaryawan = async (id: string | number, data: any) => {
  try {
    // Kita gunakan PUT untuk update
    const response = await axios.put(`${API_URL}/sdm/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Gagal update SDM:", error);
    throw error;
  }
};

// 5. Hapus Karyawan (Hanya satu fungsi, sudah diperbaiki)
export const deleteKaryawan = async (id: string | number) => {
  try {
    const response = await axios.delete(`${API_URL}/sdm/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus SDM:", error);
    throw error;
  }
};
