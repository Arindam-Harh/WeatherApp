import { WiHumidity, WiStrongWind } from "react-icons/wi";

export const ForecastModal = ({ forecast, getIcon, onClose }) => {
  return (
    <div className="forecast-modal">
      {/* Fixed Close Button */}
      <button className="forecast-close-btn" onClick={onClose}>
        ✕
      </button>

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

              <p className="forecast-date">{date.toLocaleDateString()}</p>

              <p className="forecast-weather">{day.weather[0].description}</p>

              <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
              <div className="forecast-extra">
                <span>
                  <WiHumidity />
                  {day.main.humidity}%
                </span>

                <span>
                  <WiStrongWind />
                  {Math.round(day.wind.speed)} m/s
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Close Button */}
      <button className="btn_modal forecast-bottom-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
