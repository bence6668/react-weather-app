import { useEffect, useState } from "react";
import CityDTO from "../dto/CityDTO";

interface Props {
  selectCity: (city: CityDTO) => void;
}

const SearchBar = ({ selectCity }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [cities, setCities] = useState<CityDTO[]>([]);
  const [selectedCityName, setSelectedCityName] = useState<string>("");
  const [error, setError] = useState<string>("");

  const setQueryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const resetField = () => {
    setSelectedCityName("");
    setQuery("");
  };

  const handleListItemClick = (city: CityDTO) => {
    selectCity(city);
    setCities([]);
    setSelectedCityName(city.name);
  };

  const processCities = (cities: []) => {
    setError(cities.length === 0 ? "No cities found" : "");

    return cities.map((city: CityDTO) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
    }));
  };

  const fetchCities = (query: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setCities(processCities(data));
      })
      .catch((_err) => {
        setCities([]);
        setError("No cities found");
      });
  };

  useEffect(() => {
    if (query !== "") {
      fetchCities(query);
    }
  }, [query]);

  return (
    <div className="w-full mt-4 sm:mt-0 md:w-3/4 xl:w-1/2 px-4 md:px-0 space-y-2 relative">
      <input
        type="search"
        className="rounded-lg py-1 px-2 bg-opacity-20 bg-white text-white placeholder:text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white w-full"
        value={selectedCityName !== "" ? selectedCityName : query}
        placeholder="Search for location..."
        onChange={setQueryOnChange}
        onClick={resetField}
      />
      {error !== "" && <p className="text-yellow-500">{error}</p>}
      {error === "" && cities.length > 0 && (
        <ul className="absolute top-8 left-0 right-0 z-10 my-3 text-white border rounded-md bg-teal-600">
          {cities.map((city: CityDTO, index) => (
            <li
              key={index}
              className="py-1 px-2 hover:bg-teal-500 cursor-pointer"
              onClick={() => handleListItemClick(city)}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
