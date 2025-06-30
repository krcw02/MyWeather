import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../models/city';
import { CityWeather } from '../models/city-weather';
import { CityStorageService } from './city-storage.service';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = 'cb2794c666bf81899aecae0a9c1356ab';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private cityStorage: CityStorageService) {}

  getCitiesWeather(): Observable<City[]> {
    const cityNames = this.cityStorage.getCityNames();
    const requests = cityNames.map(name =>
      this.http.get<any>(`${this.apiUrl}?q=${encodeURIComponent(name)}&appid=${this.apiKey}&units=metric`).pipe(
        map(res => ({
          name: name,
          temp: Number(res.main.temp),
          wind_speed: Number(res.wind.speed),
          icon: String(res.weather[0].icon),
        }) as City)
      )
    );
    return forkJoin(requests) as Observable<City[]>;
  }

  getCityNames(): string[] {
    return this.cityStorage.getCityNames();
  }

  getCityWeather(name: string): Observable<CityWeather> {
    return this.http.get<any>(`${this.apiUrl}?q=${encodeURIComponent(name)}&appid=${this.apiKey}&units=metric`).pipe(
      map(res => ({
        name: res.name,
        country: res.sys.country,
        lon: res.coord.lon,
        lat: res.coord.lat,
        temp: Number(res.main.temp),
        feels_like: Number(res.main.feels_like),
        temp_min: Number(res.main.temp_min),
        temp_max: Number(res.main.temp_max),
        pressure: Number(res.main.pressure),
        humidity: Number(res.main.humidity),
        wind_speed: Number(res.wind.speed),
        wind_deg: Number(res.wind.deg),
        clouds: Number(res.clouds.all),
        visibility: Number(res.visibility),
        sunrise: Number(res.sys.sunrise),
        sunset: Number(res.sys.sunset),
        description: String(res.weather[0].description),
        icon: String(res.weather[0].icon),
      }) as CityWeather)
    );
  }
}
