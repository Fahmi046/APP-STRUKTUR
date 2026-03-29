import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Export type (bukan interface) untuk menghindari masalah
export type MarketingPicOption = {
  value: string;
  label: string;
};

export const getMarketingPics = async (): Promise<MarketingPicOption[]> => {
  try {
    const response = await axios.get(`${API_URL}/marketing-pics`);
    console.log("Response from API:", response.data); // Debugging

    // Pastikan response.data adalah array
    if (Array.isArray(response.data)) {
      return response.data;
    }

    // Jika response.data memiliki properti data (format Laravel Resource)
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("Gagal mengambil data marketing PIC:", error);
    return [];
  }
};
