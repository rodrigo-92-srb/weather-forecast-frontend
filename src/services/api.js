import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // URL do backend

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getWeatherData = async (city) => {
  try {
    console.log(`Making request to /api/weather/forecast?city=${city}`);
    const response = await api.get(`/api/weather/forecast?city=${city}`);
    console.log("Response from API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return null;
  }
};

export const getCities = async () => {
  try {
    const response = await api.get("/api/weather/cities");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lista de cidades:", error);
    return [];
  }
};

export default api;