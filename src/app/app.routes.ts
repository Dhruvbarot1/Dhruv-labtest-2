import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./missionlist/missionlist.component').then(m => m.MissionlistComponent)
  },
  {
    path: 'filter',
    loadComponent: () => import('./missionfilter/missionfilter.component').then(m => m.MissionfilterComponent)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./missiondetails/missiondetails.component').then(m => m.MissiondetailsComponent)
  }
];
