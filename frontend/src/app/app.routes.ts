import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.LoginComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.RegisterComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'app',
    loadComponent: () => import('./features/user/dashboard/dashboard').then((m) => m.Dashboard),
    canMatch: [authGuard, roleGuard],
    data: {
      role: 'admin',
    },
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
