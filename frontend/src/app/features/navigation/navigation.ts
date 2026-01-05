import { Component, computed, inject, signal } from '@angular/core';
import { LogoutButton } from '../auth/logout-button/logout-button';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink, ɵEmptyOutletComponent } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { LucideAngularModule, X } from 'lucide-angular';
import { RouterLinkActive } from '@angular/router';
import { RoleDirective } from '../../shared/directives/role.directive';
import { TRoles } from '../../core/models/user.model';

@Component({
  selector: 'app-navigation',
  imports: [LogoutButton, RouterLink, Button, LucideAngularModule, RouterLinkActive, RoleDirective],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  isOpen = signal(false);
  private authService = inject(AuthService);
  role = computed(() => this.authService.authStatus()?.role);
  closeIcon = X;

  userRoutes = routes;

  toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  onLinkClick() {
    this.isOpen.set(false);
  }
}

const routes: { path: string; title: string; roles: TRoles[] }[] = [
  {
    path: '',
    title: 'Home',
    roles: ['user', 'admin'],
  },
  {
    path: 'new',
    title: 'Create New',
    roles: ['user', 'admin'],
  },
  {
    path: 'tickets',
    title: 'Tickets',
    roles: ['user', 'admin'],
  },
  {
    path: 'user-manager',
    title: 'Manage Users',
    roles: ['admin'],
  },
];
