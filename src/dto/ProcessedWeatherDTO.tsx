export default interface ProcessedWeatherDTO {
  day?: string;
  name?: string;
  description: string;
  icon: string;
  temp: number;
  feels_like?: number;
  humidity?: number;
  wind_speed?: number;
  dt_txt?: string;
}
