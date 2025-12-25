import { Component } from '@angular/core';
import { LucideAngularModule, TicketCheck } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {
  ticketIcon = TicketCheck;
}
