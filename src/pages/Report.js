import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Report.css";

const Report = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/weather/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching weather reports:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="report-container">
      <h1>Relatórios de Previsão do Tempo</h1>
      {reports.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Temperatura Mínima</th>
              <th>Temperatura Máxima</th>
              <th>Condições</th>
              <th>Velocidade do Vento</th>
              <th>Direção do Vento</th>
              <th>Probabilidade de Precipitação</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.date}</td>
                <td>{report.temp_min}°C</td>
                <td>{report.temp_max}°C</td>
                <td>{report.conditions}</td>
                <td>{report.wind_speed} km/h</td>
                <td>{report.wind_direction}</td>
                <td>{report.precipitation_probability}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum relatório disponível.</p>
      )}
    </div>
  );
};

export default Report;