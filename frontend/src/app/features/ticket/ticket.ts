import { Component, computed, inject, Signal } from '@angular/core';
import { ITicket } from '../../core/models/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BackButton } from '../../shared/components/back-button/back-button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket',
  imports: [BackButton, DatePipe],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  private activatedRoute = inject(ActivatedRoute);
  private data = toSignal(this.activatedRoute.data);

  ticketData: Signal<ITicket> = computed(() => this.data()!['ticketData']);
}
