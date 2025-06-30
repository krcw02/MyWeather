import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';
declare const bootstrap: any;

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormModalComponent implements OnInit, OnDestroy {
  cityName: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  error: string | null = null;
  loading = false;
  cityFound = false;
  private cityCheckSub?: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const modalElement = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(modalElement!);
    modal.show();
  }

  checkCity(form: NgForm) {
    this.error = null;
    this.cityFound = false;
    if (this.cityCheckSub) {
      this.cityCheckSub.unsubscribe();
    }
    if (this.cityName.trim()) {
      this.loading = true;
      this.cityCheckSub = this.weatherService.getCityWeather(this.cityName.trim()).subscribe({
        next: () => {
          this.cityFound = true;
          this.loading = false;
        },
        error: () => {
          this.error = 'Nie znaleziono miasta. Sprawdź pisownię.';
          this.loading = false;
        },
      });
    }
  }

  onSave(form: NgForm) {
    if (this.cityFound && this.cityName.trim()) {
      this.save.emit(this.cityName.trim());
      form.reset();
      this.cityFound = false;
    }
  }

  onClose(form: NgForm) {
    const modalElement = document.getElementById('staticBackdrop');
    const modal = new bootstrap.Modal(modalElement!);
    if (modal) {
      form.reset();
      modal.hide();
    }
    this.cityFound = false;
    this.error = null;
    this.close.emit();
  }

  ngOnDestroy() {
    if (this.cityCheckSub) {
      this.cityCheckSub.unsubscribe();
    }
  }
}
