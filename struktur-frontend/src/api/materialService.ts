import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getMaterial = async () => {
  const response = await axios.get(`${API_URL}/material`);
  return response.data;
};

export const getMaterialDetail = async (id: string | number) => {
  const response = await axios.get(`${API_URL}/material/${id}`);
  return response.data;
};

export const createMaterial = async (data: any) => {
  const response = await axios.post(`${API_URL}/material`, data);
  return response.data;
};

export const updateMaterial = async (id: string | number, data: any) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return axios.post(`${API_URL}/material/${id}`, data);
  } else {
    return axios.put(`${API_URL}/material/${id}`, data);
  }
};

export const deleteMaterial = async (id: string | number) => {
  const response = await axios.delete(`${API_URL}/material/${id}`);
  return response.data;
};
