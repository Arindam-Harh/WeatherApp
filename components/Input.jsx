import { useState } from "react";

export const Input = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");

  const getCityName = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      return;
    }
    onCitySubmit(city);
    setCity("");
  };

  return (
    <>
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
    </>
  );
};
