import { useState, useEffect } from "react";
import CityDTO from "../dto/CityDTO";
import ProcessedWeatherDTO from "../dto/ProcessedWeatherDTO";
import WeatherDTO from "../dto/WeatherDTO";
import Loader from "./Loader";

interface Props {
  city: CityDTO;
}

const CurrentWeather = ({ city }: Props) => {
  const [weather, setWeather] = useState<ProcessedWeatherDTO | null>(null);
  const [error, setError] = useState<string>("");

  const processWeather = (weather: WeatherDTO) => {
    return {
      name: weather.name,
      description: weather.weather[0].main,
      icon: weather.weather[0].icon,
      temp: Math.round(weather.main.temp),
      feels_like: Math.round(weather.main.feels_like),
      humidity: weather.main.humidity,
      wind_speed: Math.round(weather.wind.speed),
    };
  };

  const fetchWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${
        city.lon
      }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(processWeather(data));
        setError("");
      })
      .catch((_err) => {
        setError("Error fetching current weather");
      });
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <>
      {error && <p className="text-white text-xl">{error}</p>}

      {weather ? (
        <div className="flex gap-8">
          <div className="space-y-1 sm:space-y-3">
            <p className="text-white text-xl sm:text-2xl font-bold">{weather.name}</p>
            <div className="flex gap-3">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                id="weather-icon"
                alt="weather icon"
                className="w-16 h-16 sm:w-20 sm:h-20"
              />
              <p className="text-white text-3xl sm:text-6xl">{weather.temp}°C</p>
            </div>
            <p className="text-white text-xl pl-4">{weather.description}</p>
          </div>
          <div className="w-1/2 text-center space-y-2 py-3 text-white text-md font-bold sm:text-xl sm:font-normal">
            <p>
              Feels like {weather.feels_like}°C
            </p>
            <p>Humidity {weather.humidity}%</p>
            <p>Wind {weather.wind_speed} km/h</p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CurrentWeather;
