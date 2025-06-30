import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city';
import { CityRowComponent } from '../city-row/city-row.component';

@Component({
  selector: 'table[app-cities-table]',
  imports: [CommonModule, CityRowComponent],
  templateUrl: './city-table.component.html',
  styleUrl: './city-table.component.scss',
})
export class CitiesTableComponent {
  @Input() cities: City[] = [];
  @Output() rowClicked = new EventEmitter<City>();
  @Output() deleteCity = new EventEmitter<string>();

  onRowClick(city: City) {
    this.rowClicked.emit(city);
  }

  onDeleteCity(cityName: string) {
    this.deleteCity.emit(cityName);
  }
}
