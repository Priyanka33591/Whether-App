const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city || city.trim() === '') {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );

    const { main, weather, wind, name } = response.data;

    res.json({
      city: name,
      temperature: main.temp,
      condition: weather[0].main,
      icon: `http://openweathermap.org/img/wn/${weather[0].icon}.png`,
      humidity: main.humidity,
      wind: wind.speed,
    });
  } catch (error) {
    res.status(404).json({ error: 'City not found' });
  }
});

router.get('/forecast', async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const forecast = response.data.list.filter((_, i) => i % 8 === 0).map(item => ({
      date: item.dt_txt.split(' ')[0],
      temp: item.main.temp,
      icon: item.weather[0].icon,
      description: item.weather[0].main,
    }));

    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});
module.exports = router;

