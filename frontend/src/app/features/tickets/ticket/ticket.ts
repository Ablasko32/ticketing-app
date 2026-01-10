import { Component, inject, input, signal } from '@angular/core';
import { ITicket } from '../../../core/models/ticket.model';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { DatePipe } from '@angular/common';
import { Button } from '../../../shared/components/button/button';
import { TicketService } from '../../../core/services/ticket.service';
import { ToastService } from '../../../core/services/toast.service';
import { RouterLink } from '@angular/router';
import { PriorityFlames } from './priority-flames/priority-flames';
import { RoleDirective } from '../../../shared/directives/role.directive';

@Component({
  selector: 'app-ticket',
  imports: [
    CdkDrag,
    LucideAngularModule,
    DatePipe,
    Button,
    RouterLink,
    PriorityFlames,
    RoleDirective,
  ],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  loading = signal(false);
  ticket = input.required<ITicket>();
  trash = Trash;

  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);

  onDelete(ticketId: string) {
    this.loading.set(true);
    this.ticketService.deleteTicket(ticketId).subscribe({
      next: () => {
        this.toastService.showToast({
          title: 'Ticket deleted successfully',
          message: 'The ticket has been deleted successfully',
          type: 'success',
        });
        this.ticketService.refreshTickets();
      },
      error: (err) => {
        this.toastService.showToast({
          title: 'Error deleting ticket',
          message: err,
          type: 'error',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
