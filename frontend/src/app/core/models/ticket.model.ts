import { TicketPriority } from '../constants/ticket.constants';

export interface ITicket {
  id: string;
  title: string;
  dateCreated: string;
  status: ITicketStatus;
}

export interface ITicketCreate {
  title: string;
  description: string;
  priority: TicketPriority;
}

export type ITicketStatus = 'todo' | 'progress' | 'done';
