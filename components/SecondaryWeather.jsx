import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";

export const SecondaryWeather = ({ weather }) => {
  return (
    <div className="weather_data fade-in">
      <section className="wdata">
        <span className="metric-title">Wind Speed</span>
        <FaWind className="metric-icon" />
        <span className="metric-value">
          {weather?.wind?.speed} m/s
        </span>
      </section>

      <section className="wdata">
        <span className="metric-title">Feels Like</span>
        <FaTemperatureHigh className="metric-icon" />
        <span className="metric-value">
          {Math.round(weather?.main?.feels_like)}&deg;C
        </span>
      </section>

      <section className="wdata">
        <span className="metric-title">Humidity</span>
        <WiHumidity className="metric-icon" />
        <span className="metric-value">
          {weather?.main?.humidity}%
        </span>
      </section>

      <section className="wdata">
        <span className="metric-title">Pressure</span>
        <FaTachometerAlt className="metric-icon" />
        <span className="metric-value">
          {weather?.main?.pressure} hPa
        </span>
      </section>

      <section className="wdata">
        <span className="metric-title">Sunrise</span>
        <GiSunrise className="metric-icon" />
        <span className="metric-value">
          {new Date(
            weather?.sys?.sunrise * 1000
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </section>

      <section className="wdata">
        <span className="metric-title">Sunset</span>
        <GiSunset className="metric-icon" />
        <span className="metric-value">
          {new Date(
            weather?.sys?.sunset * 1000
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </section>
    </div>
  );
};