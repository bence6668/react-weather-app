import CityDTO from "../dto/CityDTO";
import CurrentWeather from "./CurrentWeather";
import WeeklyWeather from "./WeeklyWeather";

interface Props {
  city: CityDTO;
}

const WeatherContainer = ({ city }: Props) => {
  return (
    <div className="bg-white bg-opacity-20 py-8 px-4 sm:px-12 w-full md:w-3/4 xl:w-1/2 rounded-xl shadow-2xl space-y-4 sm:space-y-8">
      <CurrentWeather city={city} />
      <WeeklyWeather city={city} />
    </div>
  );
};

export default WeatherContainer;
