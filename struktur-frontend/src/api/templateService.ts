import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getTemplate = async () => {
  const response = await axios.get(`${API_URL}/template`);
  return response.data;
};

export const getTemplateDetail = async (id: string | number) => {
  const response = await axios.get(`${API_URL}/template/${id}`);
  return response.data;
};

export const createTemplate = async (data: any) => {
  const response = await axios.post(`${API_URL}/template`, data);
  return response.data;
};

export const updateTemplate = async (id: string | number, data: any) => {
  if (data instanceof FormData) {
    data.append("_method", "PUT");
    return axios.post(`${API_URL}/template/${id}`, data);
  } else {
    return axios.put(`${API_URL}/template/${id}`, data);
  }
};

export const deleteTemplate = async (id: string | number) => {
  const response = await axios.delete(`${API_URL}/template/${id}`);
  return response.data;
};
