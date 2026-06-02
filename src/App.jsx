import { useState } from "react";
import { Modal } from "../components/Modal.jsx";
// const API_KEY = `bfd3d0b5ded135b477ad7c473a4ae359`;
// const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

// const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
export const App = () => {
  const [city, setCity] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getCityName = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      // alert('Please Enter a Valid City Name.');
      setShowModal(true);
      return;
    }
    console.log(city);
    setCity("");
  };
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
            <h2 className="temperature">temperature</h2>
            <h2 className="city">City Name</h2>
            <h2 className="date">date</h2>
          </div>
          <div className="weather_data">
            <section className="wdata wind_speed">wind</section>
            <section className="wdata feels_like">feels like</section>
            <section className="wdata humidity">humidity</section>
            <section className="wdata preception">preception</section>
          </div>
        </section>
      </div>
    </>
  );
};
