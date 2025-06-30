import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CityDetailsComponent } from './cities/components/city-details/city-details.component';
import { AboutComponent } from './about/about.component';
export const routes: Routes = [
  {
    path: '',
    component: CitiesComponent,
  },
  {
    path: 'cities',
    component: CitiesComponent,
  },
  {
    path: 'cities/:name',
    component: CityDetailsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
