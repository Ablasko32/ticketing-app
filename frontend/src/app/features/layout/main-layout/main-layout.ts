import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Navigation } from '../../navigation/navigation';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TicketHubService } from '../../../core/services/ticketHub.service';

@Component({
  selector: 'app-main-layout',
  imports: [Navigation, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private ticketHubService = inject(TicketHubService);

  authStatus = this.authService.authStatus;

  ngOnInit(): void {
    this.ticketHubService.startConnection();
  }

  ngOnDestroy(): void {
    this.ticketHubService.stopConnection();
  }
}
