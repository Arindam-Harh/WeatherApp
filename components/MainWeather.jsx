import { useEffect, useState } from "react";

export const MainWeather = ({ weather, geoWeather, Icon }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
    </>
  );
};
