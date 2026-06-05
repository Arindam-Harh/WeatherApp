export const Forecast = ({ forecast, getIcon }) => {
  return (
    <div className="forecast-container">
      <h2 className="forecast-title">5-Day Forecast</h2>

      <div className="forecast-grid">
        {forecast.map((day) => {
          const date = new Date(day.dt_txt);

          const Icon = getIcon(day.weather[0].description);

          return (
            <div className="forecast-card" key={day.dt}>
              <Icon className="forecast-icon" />

              <h3 className="forecast-day">
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </h3>

              <p className="forecast-date">
                {date.toLocaleDateString()}
              </p>

              <p className="forecast-weather">
                {day.weather[0].description}
              </p>

              <p className="forecast-temp">
                {Math.round(day.main.temp)}&deg;C
              </p>

              <div className="forecast-extra">
                <span>💧 {day.main.humidity}%</span>
                <span>💨 {Math.round(day.wind.speed)} m/s</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};