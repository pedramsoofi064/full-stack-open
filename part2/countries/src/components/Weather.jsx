import { useEffect, useState } from "react";
import axios from "axios";
import countryServices from "../services/country";

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const getWeather = () => {
    countryServices
      .getWeatherByCity({
        city,
      })
      .then((response) => {
        setWeather(response.data);
      });
  };
  useEffect(getWeather, [city]);

  if(!weather) return null
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>
        <b>temperature: </b>
        {kelvinToCelsius(weather.main.temp)} Celsius
      </p>
      <div>
        <img
          alt=""
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      </div>
      <p>
        <b>wind: </b>
        {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default Weather;
