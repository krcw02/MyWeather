import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../models/city';

@Component({
  selector: 'tr[app-city-row]',
  imports: [CommonModule],
  templateUrl: './city-row.component.html',
  styleUrl: './city-row.component.scss',
})
export class CityRowComponent {
  @Input() city!: City;
  @Input() index!: number;
  @Output() rowClicked = new EventEmitter<void>();
  @Output() deleteCity = new EventEmitter<void>();

  onRowClick() {
    this.rowClicked.emit();
  }

  onDeleteClick() {
    this.deleteCity.emit();
  }
}
