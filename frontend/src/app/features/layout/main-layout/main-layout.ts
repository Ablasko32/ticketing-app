import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Navigation } from '../../navigation/navigation';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { SignalRHubService } from '../../../core/services/signalRHub.service';

@Component({
  selector: 'app-main-layout',
  imports: [Navigation, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private singalRHubService = inject(SignalRHubService);

  authStatus = this.authService.authStatus;

  ngOnInit(): void {
    this.singalRHubService.startConnection();
  }

  ngOnDestroy(): void {
    this.singalRHubService.stopConnection();
  }
}
