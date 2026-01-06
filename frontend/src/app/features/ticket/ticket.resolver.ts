import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { inject } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { ITicket } from '../../core/models/ticket.model';

export const ticketResolver: ResolveFn<ITicket> = (
  activatedRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const ticketService = inject(TicketService);

  const ticketId = activatedRoute.paramMap.get('id')!;

  return ticketService.getTicket(ticketId);
};
