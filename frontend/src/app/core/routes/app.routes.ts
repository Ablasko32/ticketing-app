import { Routes } from '@angular/router';
import { guestGuard } from '../guards/guest.guard';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../../features/auth/login/login').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../../features/auth/register/register').then((m) => m.RegisterComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'app',
    loadComponent: () =>
      import('../../features/layout/main-layout/main-layout').then((m) => m.MainLayout),
    canMatch: [authGuard],
    loadChildren: () => import('../routes/main.routes').then((m) => m.routes),
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
