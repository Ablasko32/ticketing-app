import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: 'app',
    loadComponent: () => import('./features/user/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
