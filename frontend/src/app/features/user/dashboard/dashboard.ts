import { Component } from '@angular/core';
import { LogoutButton } from '../../auth/logout-button/logout-button';

@Component({
  selector: 'app-dashboard',
  imports: [LogoutButton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
