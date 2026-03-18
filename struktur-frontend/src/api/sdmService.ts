import axios from "axios";

// Sesuaikan URL dengan nama project di Laragon Anda
const API_URL = "http://127.0.0.1:8000/api";

export const getKaryawan = async () => {
  try {
    const response = await axios.get(`${API_URL}/sdm`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data SDM:", error);
    throw error;
  }
};

// Ambil Detail Karyawan berdasarkan ID
export const getKaryawanDetail = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/sdm/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail SDM:", error);
    throw error;
  }
};
