import { useEffect, useState } from "react";
import { Modal } from "../components/Modal.jsx";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";

const API_KEY = `bfd3d0b5ded135b477ad7c473a4ae359`;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState("");
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

  const getCityName = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      // alert('Please Enter a Valid City Name.');
      setShowModal(true);
      return;
    }
    console.log(city);
    displayCity(city);
    setCity("");
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

  return (
    <>
      <div className="main">
        <header className="h">
          <h1>Weather in Your City</h1>
        </header>
        <section className="body">
          {showModal && (
            <div className="overlay">
              <Modal onClose={() => setShowModal(false)} />
            </div>
          )}
          <form onSubmit={getCityName} className="city_search">
            <input
              type="text"
              name="city"
              id="search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search your city ... "
            />
            <button type="submit" className="btn_search">
              Search
            </button>
          </form>
          <div className="temp">
            <h2 className="temperature">{weather?.main?.temp} &deg;C</h2>
            <h2 className="city">{geoWeather[0]?.name}</h2>
            <h2 className="date">{date.toLocaleTimeString()}</h2>
            <h2 className="date">{date.toLocaleDateString()}</h2>
          </div>
          <div className="weather_data">
            <section className="wdata wind_speed"><FaWind size={25}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weather?.wind?.speed}  m/s</section>
            <section className="wdata feels_like"><FaTemperatureHigh size={25}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weather?.main?.feels_like} &deg;C</section>
            <section className="wdata humidity"><WiHumidity size={25}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weather?.main?.humidity} %</section>
            <section className="wdata preception"><FaTachometerAlt size={25}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{weather?.main?.pressure} hPa</section>
          </div>
        </section>
      </div>
    </>
  );
};
