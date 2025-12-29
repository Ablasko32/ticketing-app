import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-tickets',
  imports: [],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {
  private ticketService = inject(TicketService);

  ngOnInit(): void {
    this.loadTickets();
    this.ticketService.refresh$.subscribe(() => {
      this.loadTickets();
    });
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe({
      next: (tickets) => {
        console.log(tickets);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
