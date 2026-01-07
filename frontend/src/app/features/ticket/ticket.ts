import { Component, computed, inject, Signal } from '@angular/core';
import { ITicket } from '../../core/models/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BackButton } from '../../shared/components/back-button/back-button';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, PlusIcon } from 'lucide-angular';
import { PriorityFlames } from '../tickets/ticket/priority-flames/priority-flames';
import { TicketComments } from './ticket-comments/ticket-comments';
import { Button } from '../../shared/components/button/button';
import { ModalService } from '../../core/services/modal.service';
import { AddNew } from './ticket-comments/add-new/add-new';

@Component({
  selector: 'app-ticket',
  imports: [BackButton, DatePipe, LucideAngularModule, PriorityFlames, TicketComments, Button],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  private activatedRoute = inject(ActivatedRoute);
  private data = toSignal(this.activatedRoute.data);
  private modalService = inject(ModalService);

  plusIcon = PlusIcon;

  ticketData: Signal<ITicket> = computed(() => this.data()!['ticketData']);

  handleOpenModal() {
    this.modalService.setOpen(AddNew, { ticketId: this.ticketData().id });
  }
}
