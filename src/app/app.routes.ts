import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'create', loadComponent: () => import('./pages/create/create').then((m) => m.Create) },
  { path: 'join', loadComponent: () => import('./pages/join/join').then(m => m.Join) },
];
