import { ITicket } from './ticket.model';

export interface IDashboardStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  completedTickets: number;
  highPriorityTickets: number;
  mediumPriorityTickets: number;
  lowPriorityTickets: number;
  highPriorityOpen: number;
  completionRate: number;
  highPriorityOpenTickets?: ITicket[];
}
