import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-logout-button',
  imports: [Button],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  loading = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogut() {
    this.loading.set(true);
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res.message);

        this.router.navigate(['login']);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err.error?.message || 'Unexpected error has occured');
      },
    });
  }
}
