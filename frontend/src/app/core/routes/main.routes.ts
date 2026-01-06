import { Route } from '@angular/router';
import { roleGuard } from '../guards/role.guard';
import { ticketResolver } from '../../features/ticket/ticket.resolver';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../../features/admin/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'new',
    loadComponent: () => import('../../features/add-new/add-new').then((m) => m.AddNew),
  },
  {
    path: 'tickets',
    loadComponent: () => import('../../features/tickets/tickets').then((m) => m.Tickets),
  },
  {
    path: 'ticket/:id',
    loadComponent: () => import('../../features/ticket/ticket').then((m) => m.Ticket),
    resolve: {
      ticketData: ticketResolver,
    },
  },
  {
    path: 'user-manager',
    canActivate: [roleGuard],
    data: {
      role: 'admin',
    },
    loadComponent: () =>
      import('../../features/admin/user-manager/user-manager').then((m) => m.UserManager),
  },
];
