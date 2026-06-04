import { useState } from "react";
import { Modal } from "./Modal";

export const Input = ({ onCitySubmit }) => {
  const [city, setCity] = useState("");

  const getCityName = (e) => {
    e.preventDefault();
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
