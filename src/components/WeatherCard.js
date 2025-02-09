import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return <p>Carregando...</p>;

  return (
    <div className="weather-card">
      <h2>Previsão do tempo para {data.city}</h2>
      <p>Temperatura mínima: {data.tempMin}°C</p>
      <p>Temperatura máxima: {data.tempMax}°C</p>
      <p>Condições: {data.conditions}</p>
      <p>Vento: {data.windSpeed} km/h</p>
    </div>
  );
};

export default WeatherCard;