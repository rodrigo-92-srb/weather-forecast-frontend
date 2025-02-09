import React, { useState, useEffect } from "react";
import { getWeatherData, getCities } from "../services/api";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      const citiesList = await getCities();
      setCities(citiesList);
    };

    fetchCities();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    setWeatherData(null); // Limpar as informações da busca anterior
    try {
      console.log(`Fetching weather data for city: ${city}`);
      const response = await getWeatherData(city);
      console.log("Weather data received:", response);
      setWeatherData(response);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setLoading(false);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setWeatherData(null); // Limpar as informações da busca anterior
  };

  const renderWeatherData = () => {
    if (!weatherData || !weatherData.data_day) {
      return null;
    }

    const {
      temperature_min,
      temperature_max,
      weather,
      windspeed_mean,
      winddirection,
      precipitation_probability,
    } = weatherData.data_day;

    return (
      <div className="weather-data">
        <h2>Previsão para {city || `Lat: ${latitude}, Lon: ${longitude}`}</h2>
        <p>Temperatura Mínima: {temperature_min && temperature_min[0] !== undefined ? temperature_min[0] : "N/A"}°C</p>
        <p>Temperatura Máxima: {temperature_max && temperature_max[0] !== undefined ? temperature_max[0] : "N/A"}°C</p>
        <p>Condições: {weather && weather[0] !== undefined ? weather[0] : "N/A"}</p>
        <p>Velocidade do Vento: {windspeed_mean && windspeed_mean[0] !== undefined ? windspeed_mean[0] : "N/A"} km/h</p>
        <p>Direção do Vento: {winddirection && winddirection[0] !== undefined ? winddirection[0] : "N/A"}</p>
        <p>Probabilidade de Precipitação: {precipitation_probability && precipitation_probability[0] !== undefined ? precipitation_probability[0] : "N/A"}%</p>
      </div>
    );
  };

  const goToReports = () => {
    navigate("/report");
  };

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <select value={city} onChange={handleCityChange} onClick={() => setWeatherData(null)}>
        <option value="">Selecione uma cidade</option>
        {cities.map((city) => (
          <option key={city.city} value={city.city}>
            {city.city}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude"
        />
      </div>
      <div className="button-group">
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
        <button className="report-button" onClick={goToReports}>
          Ver Relatórios
        </button>
      </div>
      {renderWeatherData()}
    </div>
  );
};

export default Home;