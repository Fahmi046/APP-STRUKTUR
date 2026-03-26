import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// 1. Ambil Semua Vendor
export const getVendor = async () => {
  try {
    const response = await axios.get(`${API_URL}/vendor`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data Vendor:", error);
    throw error;
  }
};

// 2. Ambil Detail Vendor berdasarkan ID
export const getVendorDetail = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/vendor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil detail Vendor:", error);
    throw error;
  }
};

// 3. Tambah Vendor Baru
export const createVendor = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/vendor`, data);
    return response.data;
  } catch (error) {
    console.error("Gagal menambah Vendor:", error);
    throw error;
  }
};

// 4. Update/Edit Data Vendor
export const updateVendor = async (id: string | number, data: any) => {
  try {
    // Jika FormData (ada file upload), gunakan POST dengan method spoofing
    if (data instanceof FormData) {
      data.append("_method", "PUT");

      const response = await axios.post(`${API_URL}/vendor/${id}`, data, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return response.data;
    } else {
      // Jika regular JSON data, gunakan PUT langsung
      const response = await axios.put(`${API_URL}/vendor/${id}`, data);
      return response.data;
    }
  } catch (error) {
    console.error("Gagal update Vendor:", error);
    throw error;
  }
};

// 5. Hapus Vendor
export const deleteVendor = async (id: string | number) => {
  try {
    const response = await axios.delete(`${API_URL}/vendor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus Vendor:", error);
    throw error;
  }
};
