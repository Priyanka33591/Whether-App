import React from 'react';

const WeatherCard = ({ data }) => (
  <>
  <div className="weather-card">
    <h2>{data.city}</h2>
    <img src={data.icon} alt="weather icon" />
    <p>{data.condition}</p>
    <p>Temperature: {data.temperature}°C</p>
    <p>Humidity: {data.humidity}%</p>
    <p>Wind Speed: {data.wind} m/s</p>
  </div>
  </>
);

export default WeatherCard;
