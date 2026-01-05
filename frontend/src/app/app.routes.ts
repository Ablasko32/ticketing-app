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
    loadComponent: () =>
      import('./features/layout/main-layout/main-layout').then((m) => m.MainLayout),
    canMatch: [authGuard],

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'new',
        loadComponent: () => import('./features/add-new/add-new').then((m) => m.AddNew),
      },
      {
        path: 'tickets',
        loadComponent: () => import('./features/tickets/tickets').then((m) => m.Tickets),
      },
      {
        path: 'user-manager',
        canActivate: [roleGuard],
        data: {
          role: 'admin',
        },
        loadComponent: () =>
          import('./features/admin/user-manager/user-manager').then((m) => m.UserManager),
      },
    ],
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
