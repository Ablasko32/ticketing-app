import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ITicket, ITicketStatus } from '../../core/models/ticket.model';
import { Loader } from '../../shared/components/loader/loader';
import { Ticket } from './ticket/ticket';

@Component({
  selector: 'app-tickets',
  imports: [CdkDropList, Loader, Ticket],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {
  tickets = signal<ITicket[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  todo = computed(() => this.tickets().filter((ticket) => ticket.status === 'todo'));
  progress = computed(() => this.tickets().filter((ticket) => ticket.status === 'progress'));
  done = computed(() => this.tickets().filter((ticket) => ticket.status === 'done'));

  private ticketService = inject(TicketService);

  ngOnInit(): void {
    this.loadTickets();
    this.ticketService.refresh$.subscribe(() => {
      this.loadTickets();
    });
  }

  private loadTickets() {
    this.loading.set(true);
    this.ticketService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets.set(tickets);
      },
      error: (error) => {
        this.error.set(error);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  drop(event: CdkDragDrop<ITicket[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    const newStatus = event.container.id as ITicketStatus;
    const oldStatus = item.status;

    this.tickets.update((tickets) =>
      tickets.map((ticket) => (ticket.id === item.id ? { ...ticket, status: newStatus } : ticket))
    );

    this.ticketService.updateTicketStatus(item.id, newStatus).subscribe({
      next: () => {
        this.ticketService.refreshTickets();
      },
      error: (error) => {
        this.error.set('Error updating ticket status');
        this.tickets.update((tickets) =>
          tickets.map((ticket) =>
            ticket.id === item.id ? { ...ticket, status: oldStatus } : ticket
          )
        );
      },
    });
  }
}
