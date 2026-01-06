import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { inject } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { ITicket } from '../../core/models/ticket.model';
import { Ticket } from 'lucide-angular';
import { map } from 'rxjs';

export const ticketResolver: ResolveFn<ITicket> = (
  activatedRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const ticketService = inject(TicketService);

  const ticketId = activatedRoute.paramMap.get('id')!;

  return ticketService.getTicket(ticketId);
};

export const ticketTitleResolver: ResolveFn<string> = (activatedRoute, state) => {
  const ticketService = inject(TicketService);
  const ticketId = activatedRoute.paramMap.get('id')!;

  return ticketService.getTicket(ticketId).pipe(map((t) => `Ticket | ${t.title}`));
};
