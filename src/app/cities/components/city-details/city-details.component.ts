import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityWeather } from '../../models/city-weather';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.scss',
  imports: [CommonModule],
  standalone: true,
})
export class CityDetailsComponent {
  cityName: string = '';
  cityWeather: CityWeather | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.cityName = name;
        this.fetchCityWeather(name);
      }
    });
  }

  fetchCityWeather(name: string) {
    this.loading = true;
    this.error = null;
    this.weatherService.getCityWeather(name).subscribe({
      next: (data) => {
        this.cityWeather = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd pobierania szczegółów pogody.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/cities']);
  }
}
