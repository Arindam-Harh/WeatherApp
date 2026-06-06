import { useEffect, useState } from "react";
import rainSound from "./assets/rain.mp3";
import { Modal } from "../components/Modal.jsx";
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
import { FaCalendarAlt } from "react-icons/fa";
import { WiStrongWind } from "react-icons/wi";
import { Header } from "../components/Header.jsx";
import { Input } from "../components/Input.jsx";
import { MainWeather } from "../components/MainWeather.jsx";
import { SecondaryWeather } from "../components/SecondaryWeather.jsx";
import { Loading } from "../components/Loading.jsx";
import { ForecastModal } from "../components/Forecast.jsx";
import birdSound from "./assets/birds.mp3";
import thunderSound from "./assets/thunder.mp3";
import windSound from "./assets/wind.mp3";

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
  const [showModal, setShowModal] = useState(false);
  const [geoWeather, setGeoWeather] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    let audio;

    const weatherType = weather?.weather?.[0]?.main;

    if (weatherType === "Rain" || weatherType === "Drizzle") {
      audio = new Audio(rainSound);
    } else if (weatherType === "Clear") {
      audio = new Audio(birdSound);
    } else if (weatherType === "Thunderstorm") {
      audio = new Audio(thunderSound);
    } else if (weatherType === "Clouds") {
      audio = new Audio(windSound);
    }

    if (audio) {
      audio.loop = true;
      audio.volume = 0.8;
      audio.play().catch(() => {});
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [weather]);

  const displayCity = async (city) => {
    try {
      setLoading(true);

      const startTime = Date.now();

      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;

      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();
      console.log(geoData);
      if (geoData.length == 0) {
        setShowModal(true);
        return;
      }
      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setGeoWeather(geoData);

      const res = await fetch(weatherUrl);
      const info = await res.json();

      console.log(info);
      setWeather(info);

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const forecastRes = await fetch(forecastUrl);
      const forecastData = await forecastRes.json();
      const dailyForecast = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00"),
      );
      setForecast(dailyForecast);

      const elapsed = Date.now() - startTime;
      const minLoadingTime = 1000;

      if (elapsed < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsed),
        );
      }
    } catch (error) {
      setShowModal(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    displayCity("Kolkata");
  }, []);

  const getIcon = (type) => {
    return weatherIconMap[type] || WiDaySunny;
  };

  const Icon = getIcon(weather?.weather[0]?.description);

  const handleCitySubmit = (cityName) => {
    if (cityName.trim() === "") {
      setShowModal(true);
      return;
    }
    displayCity(cityName);
  };
  if (loading) {
    return <Loading />;
  }
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

          <MainWeather weather={weather} geoWeather={geoWeather} Icon={Icon} />

          <SecondaryWeather weather={weather} />
          <button
            className="btn_forecast"
            onClick={() => setShowForecast(true)}
          >
            <FaCalendarAlt />
            &nbsp; View 5-Day Forecast
          </button>
          {showForecast && (
            <div className="overlay">
              <ForecastModal
                forecast={forecast}
                getIcon={getIcon}
                onClose={() => setShowForecast(false)}
              />
            </div>
          )}
        </section>
      </div>
    </>
  );
};
