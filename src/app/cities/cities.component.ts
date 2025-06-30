import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CitiesTableComponent } from './components/city-table/city-table.component';
import { City } from './models/city';
import { WeatherService } from './services/weather.service';
import { CityStorageService } from './services/city-storage.service';
import { FormModalComponent } from './components/form-modal/form-modal.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  imports: [CommonModule, CitiesTableComponent, FormModalComponent],
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
  selectedCityName: string | null = null;
  loading = false;
  error: string | null = null;
  isModalOpen = false;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private cityStorage: CityStorageService
  ) {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.loading = true;
    const cityNames = this.cityStorage.getCityNames();
    if (cityNames.length === 0) {
      // domyślne miasta jeśli localStorage puste
      this.cityStorage.setCityNames([
        'Warszawa',
        'Kraków',
        'Wrocław',
        'Gdańsk',
        'Poznań',
        'Łódź',
        'Szczecin',
        'Lublin',
      ]);
    }
    this.weatherService.getCitiesWeather().subscribe({
      next: (data) => {
        this.cities = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Błąd pobierania danych pogodowych.';
        this.loading = false;
      }
    });
  }

  onRowClick(city: City) {
    this.selectedCityName = city.name;
    this.goToDetails(city);
  }

  goToDetails(city: City) {
    this.router.navigate(['/cities', city.name]);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveData(cityName: string) {
    this.cityStorage.addCity(cityName);
    this.closeModal();
    this.loadCities();
  }

  onDeleteCity(cityName: string) {
    this.cityStorage.removeCity(cityName);
    this.loadCities();
  }
}
