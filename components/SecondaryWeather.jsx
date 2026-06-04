import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { WiStrongWind } from "react-icons/wi";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";

export const SecondaryWeather = ({weather}) => {
  return (
    <>
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
    </>
  );
};
