export default interface WeeklyWeatherDTO {
  dt: number;
  main: { temp: number };
  weather: [
    {
      main: string;
      icon: string;
    }
  ];
  dt_txt: string;
}
