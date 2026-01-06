import { Component, inject } from '@angular/core';
import { Navigation } from '../../navigation/navigation';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [Navigation, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private authService = inject(AuthService);

  authStatus = this.authService.authStatus;
}
