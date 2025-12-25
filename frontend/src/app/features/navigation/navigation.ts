import { Component, computed, inject, signal } from '@angular/core';
import { LogoutButton } from '../auth/logout-button/logout-button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [LogoutButton],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private authService = inject(AuthService);

  userRoutes = signal(userRoutes);

  roleRoutes = computed(() => {
    switch (this.authService.authStatus()?.role) {
      case 'admin': {
        return adminRoutes;
      }
      case 'user': {
        return userRoutes;
      }
      case 'agent': {
        return agentRoutes;
      }
      default:
        return null;
    }
  });
}

const userRoutes = [
  {
    path: '',
    title: 'Home',
  },
  {
    path: 'new',
    title: 'Create New',
  },
  {
    path: 'tickets',
    title: 'Tickets',
  },
];

const adminRoutes = [
  {
    path: '',
    title: 'Home',
  },
  {
    path: 'new',
    title: 'Create New',
  },
  {
    path: 'tickets',
    title: 'Tickets',
  },
];

const agentRoutes = [
  {
    path: '',
    title: 'Home',
  },
  {
    path: 'new',
    title: 'Create New',
  },
  {
    path: 'tickets',
    title: 'Tickets',
  },
];
