import { useEffect, useState } from "react";
import { Modal } from "../components/Modal.jsx";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { WiStrongWind } from "react-icons/wi";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiFog,
  WiSmoke,
  WiDust,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiSleet,
  WiTornado,
  WiDayCloudy,
} from "react-icons/wi";
import { Header } from "../components/Header.jsx";
import { Input } from "../components/Input.jsx";

const weatherIconMap = {
  "clear sky": WiDaySunny,

  "few clouds": WiDayCloudy,
  "scattered clouds": WiCloud,
  "broken clouds": WiCloudy,
  "overcast clouds": WiCloudy,

  mist: WiFog,
  fog: WiFog,
  haze: WiSmoke,
  smoke: WiSmoke,
  dust: WiDust,
  sand: WiDust,
  ash: WiDust,
  squalls: WiStrongWind,
  tornado: WiTornado,

  "light rain": WiRain,
  "moderate rain": WiRain,
  "heavy intensity rain": WiRain,
  "very heavy rain": WiRain,
  "extreme rain": WiRain,
  "freezing rain": WiSleet,
  "light intensity shower rain": WiShowers,
  "shower rain": WiShowers,
  "heavy shower rain": WiShowers,

  "thunderstorm with light rain": WiThunderstorm,
  "thunderstorm with rain": WiThunderstorm,
  "thunderstorm with heavy rain": WiThunderstorm,
  "light thunderstorm": WiThunderstorm,
  thunderstorm: WiThunderstorm,
  "heavy thunderstorm": WiThunderstorm,
  "ragged thunderstorm": WiThunderstorm,
  "thunderstorm with light drizzle": WiThunderstorm,
  "thunderstorm with drizzle": WiThunderstorm,
  "thunderstorm with heavy drizzle": WiThunderstorm,

  "light snow": WiSnow,
  snow: WiSnow,
  "heavy snow": WiSnow,
  sleet: WiSleet,
  "light shower sleet": WiSleet,
  "shower sleet": WiSleet,
  "light rain and snow": WiSleet,
  "rain and snow": WiSleet,
  "light shower snow": WiSnow,
  "shower snow": WiSnow,
  "heavy shower snow": WiSnow,
};
const API_KEY = `bfd3d0b5ded135b477ad7c473a4ae359`;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [geoWeather, setGeoWeather] = useState([]);
  const [weather, setWeather] = useState(null);

  const displayCity = async (city) => {
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();
      console.log(geoData);
      if (geoData.length == 0) {
        setShowModal(true);
      }
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setGeoWeather(geoData);

      const res = await fetch(weatherUrl);
      const info = await res.json();
      console.log(info);
      setWeather(info);
    } catch (error) {
      setShowModal(true);
      console.log(error);
    }
  };

  useEffect(() => {
    displayCity("Kolkata");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const getIcon = (type) => {
    return weatherIconMap[type] || WiDaySunny;
  };
  const Icon = getIcon(weather?.weather[0]?.description);
  const handleCitySubmit = (cityName) => {
    displayCity(cityName)
  };

  return (
    <>
      <div className="main">
        <Header />
        <section className="body">
          {showModal && (
            <div className="overlay">
              <Modal onClose={() => setShowModal(false)} />
            </div>
          )}

          <Input onCitySubmit={handleCitySubmit} />
          <div className="temp fade-in">
            <h2 className="temperature fade-in">{weather?.main?.temp} °C</h2>
            <h2 className="city">{geoWeather[0]?.name}</h2>
            <h2 className="description">
              {weather?.weather[0]?.description
                .toLowerCase()
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ")}
            </h2>
            <h2 className="time">{date.toLocaleTimeString()}</h2>
            <h2 className="wicon">{Icon && <Icon size={30} />}</h2>
            <h2 className="date">{date.toLocaleDateString()}</h2>
          </div>
          <div className="weather_data fade-in">
            <section className="wdata wind_speed">
              <FaWind size={25} /> &nbsp;&nbsp;&nbsp;
              {weather?.wind?.speed} m/s
            </section>
            <section className="wdata feels_like">
              <FaTemperatureHigh size={25} /> &nbsp;&nbsp;
              {weather?.main?.feels_like} &deg;C
            </section>
            <section className="wdata humidity">
              <WiHumidity size={25} /> &nbsp;&nbsp;&nbsp;
              {weather?.main?.humidity} %
            </section>
            <section className="wdata preception">
              <FaTachometerAlt size={25} /> &nbsp;&nbsp;&nbsp;
              {weather?.main?.pressure} hPa
            </section>
            <section className="wdata sunrise">
              <GiSunrise size={25} /> &nbsp;&nbsp;&nbsp;
              {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString()}
            </section>
            <section className="wdata sunset">
              <GiSunset size={25} /> &nbsp;&nbsp;&nbsp;
              {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString()}
            </section>
          </div>
        </section>
      </div>
    </>
  );
};
