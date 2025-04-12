import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const res = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeatherData(res.data);
      setError('');
    } catch (err) {
      setError('City not found!');
      setWeatherData(null);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>Weather Dashboard</h1>
        <button onClick={toggleDarkMode} className="toggle-btn">
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
