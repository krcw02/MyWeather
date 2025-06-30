import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CityStorageService {
  private storageKey = 'cityNames';

  getCityNames(): string[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addCity(name: string) {
    const cities = this.getCityNames();
    if (!cities.includes(name)) {
      cities.push(name);
      localStorage.setItem(this.storageKey, JSON.stringify(cities));
    }
  }

  removeCity(name: string) {
    const cities = this.getCityNames().filter(c => c.toLowerCase() !== name.toLowerCase());
    localStorage.setItem(this.storageKey, JSON.stringify(cities));
  }

  setCityNames(names: string[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(names));
  }
}
