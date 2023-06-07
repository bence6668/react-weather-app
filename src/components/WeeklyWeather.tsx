import { useEffect, useState } from "react";
import CityDTO from "../dto/CityDTO";
import ProcessedWeatherDTO from "../dto/ProcessedWeatherDTO";
import WeeklyWeatherDTO from "../dto/WeeklyWeatherDTO";
import Loader from "./Loader";

interface Props {
  city: CityDTO;
}

const WeeklyWeather = ({ city }: Props) => {
  const [weatherList, setWeatherList] = useState<ProcessedWeatherDTO[]>([]);
  const [error, setError] = useState<string>("");

  const processWeather = (weather: []) => {
    return weather
      .map((dailyWeather: WeeklyWeatherDTO) => {
        return {
          day: new Date(dailyWeather.dt * 1000).toLocaleString("en-US", {
            weekday: "long",
          }),
          description: dailyWeather.weather[0].main,
          icon: dailyWeather.weather[0].icon,
          temp: Math.round(dailyWeather.main.temp),
          dt_txt: dailyWeather.dt_txt,
        };
      })
      .filter((weather: ProcessedWeatherDTO) =>
        weather.dt_txt?.includes("12:00:00")
      );
  };

  const fetchWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
        city.lon
      }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherList(processWeather(data.list));
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
    <div className="space-y-3">
      <p className="text-white text-md font-bold">Weekly Forecast</p>
      {error && <p className="text-yellow-500 text-md">{error}</p>}
      {weatherList.length !== 0 ? (
        <ul className="sm:flex justify-between">
          {weatherList.map((weather: ProcessedWeatherDTO, index: number) => {
            return (
              <li key={index}>
                <div className="text-center py-2 px-3">
                  <p className="text-white text-md font-bold">{weather.day}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                    alt="weather icon"
                    className="w-14 h-14 m-auto"
                  />
                  <p className="text-white text-md">{weather.description}</p>
                  <p className="text-white text-md font-bold">
                    {weather.temp}°C
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WeeklyWeather;
