import { DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { ITicket } from '../../../core/models/ticket.model';
import { Button } from '../../../shared/components/button/button';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { TicketService } from '../../../core/services/ticket.service';
import { ToastService } from '../../../core/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-comments',
  imports: [DatePipe, Button, LucideAngularModule],
  templateUrl: './ticket-comments.html',
  styleUrl: './ticket-comments.css',
})
export class TicketComments {
  ticketData = input.required<ITicket>();
  trashIcon = Trash;
  loading = signal(false);

  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);
  private routerService = inject(Router);

  handleDelete(commentId: number) {
    this.loading.set(true);
    this.ticketService.deleteTicketComment(commentId).subscribe({
      next: () => {
        this.toastService.showToast({
          type: 'success',
          title: 'Comment deleted',
          message: 'Comment has succesfully been deleted',
        });
        this.routerService.navigate([]);
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          title: 'Error deleting',
          message: 'Unable to delete comment',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
