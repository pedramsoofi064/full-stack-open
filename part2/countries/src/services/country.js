import axios from "axios";
const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const getAll = () => {
  return axios.get(`${BASE_URL}/all`);
};

export const getWeatherByCity = ({city}) => {
  return axios.get(
    `${WEATHER_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}`
  );
};

export default {
  getAll,
  getWeatherByCity,
};
