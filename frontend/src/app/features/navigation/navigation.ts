import { Component, computed, inject, signal } from '@angular/core';
import { LogoutButton } from '../auth/logout-button/logout-button';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { LucideAngularModule, X } from 'lucide-angular';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [LogoutButton, RouterLink, Button, LucideAngularModule, RouterLinkActive],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  isOpen = signal(false);
  private authService = inject(AuthService);
  role = computed(() => this.authService.authStatus()?.role);
  closeIcon = X;

  userRoutes = signal(userRoutes);

  roleRoutes = computed(() => {
    switch (this.role()) {
      case 'admin': {
        console.log('ADMIN ROUTES');
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

  toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  onLinkClick() {
    this.isOpen.set(false);
  }
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
  {
    path: 'user-manager',
    title: 'Manage Users',
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
