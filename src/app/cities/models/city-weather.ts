export interface CityWeather {
  name: string;
  country: string;
  lon: number;
  lat: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
}
