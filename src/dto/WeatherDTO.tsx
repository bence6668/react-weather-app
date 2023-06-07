export default interface WeatherDTO {
  name: string;
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}
