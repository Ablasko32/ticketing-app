import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ToastService } from '../../../core/services/toast.service';

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
  private toastsService = inject(ToastService);

  handleLogut() {
    this.loading.set(true);
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res.message);
        this.toastsService.showToast({
          title: 'Success',
          message: res.message,
          type: 'success',
        });

        this.router.navigate(['login']);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err.error?.message || 'Unexpected error has occured');
        this.toastsService.showToast({
          title: 'Error',
          message: err.error?.message || 'Unexpected error has occured',
          type: 'error',
        });
      },
    });
  }
}
