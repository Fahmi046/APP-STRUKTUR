import axios from "axios";

// Sesuaikan URL dengan nama project di Laragon Anda
const API_URL = "http://127.0.0.1:8000/api";

// 1. Ambil Semua Data Client
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/client`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data client:", error);
    throw error;
  }
};

// 2. Ambil Detail Client berdasarkan ID
export const getClientDetail = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/client/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail client:", error);
    throw error;
  }
};

// 3. Tambah Client Baru
export const createClient = async (data: any) => {
  try {
    // Jika data adalah FormData (dari upload file), jangan ubah
    // Jika data adalah object biasa, convert ke FormData untuk consistency
    let requestData = data;
    let headers: any = {};

    if (data instanceof FormData) {
      // FormData akan di-set otomatis oleh axios dengan Content-Type: multipart/form-data
      requestData = data;
    }

    const response = await axios.post(`${API_URL}/client`, requestData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menambah client:", error);
    throw error;
  }
};

// 4. Update/Edit Data Client
export const updateClient = async (id: string | number, data: any) => {
  try {
    // Jika FormData (ada file upload), gunakan POST dengan method spoofing
    if (data instanceof FormData) {
      // Tambahkan _method: PUT agar Laravel tahu ini adalah PUT request
      data.append("_method", "PUT");

      const response = await axios.post(`${API_URL}/client/${id}`, data, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return response.data;
    } else {
      // Jika regular JSON data, gunakan PUT langsung
      const response = await axios.put(`${API_URL}/client/${id}`, data);
      return response.data;
    }
  } catch (error) {
    console.error("Gagal update client:", error);
    throw error;
  }
};

// 5. Hapus Client
export const deleteClient = async (id: string | number) => {
  try {
    const response = await axios.delete(`${API_URL}/client/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus client:", error);
    throw error;
  }
};
