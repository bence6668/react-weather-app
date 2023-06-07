import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/WeatherContainer";
import CityDTO from "./dto/CityDTO";

const App = () => {
  const [currentCity, setCurrentCity] = useState<CityDTO | null>(null);

  const selectCity = (city: CityDTO) => {
    setCurrentCity(city);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-cyan-300 via-cyan-700 to-teal-500 flex items-center flex-col gap-4 justify-center">
      <SearchBar selectCity={selectCity} />
      {currentCity && <WeatherContainer city={currentCity} />}
    </div>
  );
};

export default App;
