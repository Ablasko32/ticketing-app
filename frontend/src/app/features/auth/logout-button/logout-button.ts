import { Component, inject } from '@angular/core';
import { Button } from '../../../components/button/button';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  imports: [Button],
  templateUrl: './logout-button.html',
  styleUrl: './logout-button.css',
})
export class LogoutButton {
  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogut() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res.message);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error(err.error?.message || 'Unexpected error has occured');
      },
    });
  }
}
