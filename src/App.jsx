export const App = () => {
  const API_KEY = `bfd3d0b5ded135b477ad7c473a4ae359`;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  return (
    <>
      <div className="main">
        <header>
          <h1>Weather in Your City</h1>
        </header>
        <section className="body">
          <div className="city_search">
            <label htmlFor="city">Search Your City : </label>
            <input
              type="text"
              name="city"
              id="search"
              placeholder="enter your city ... "
            />
            <h2>City Name</h2>
          </div>
          <div className="weather_data"></div>
        </section>
      </div>
    </>
  );
};
