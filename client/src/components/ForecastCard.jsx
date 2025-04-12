const ForecastCard = ({ forecast }) => (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        {forecast.map((day, idx) => (
          <div key={idx} className="weather-card">
            <p>{day.date}</p>
            <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="icon" />
            <p>{day.temp}°C</p>
            <p>{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default ForecastCard;
  