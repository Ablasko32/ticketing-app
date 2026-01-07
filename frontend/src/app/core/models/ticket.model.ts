import { TicketPriority } from '../constants/ticket.constants';

export interface ITicket {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  status: ITicketStatus;
  priority: TicketPriority;
  ticketComments?: ITicketComment[];
}

export interface ITicketComment {
  id: number;
  content: string;
  createdByUserId: string;
  dateCreated: string;
  username: string;
}

export interface ITicketCreate {
  title: string;
  description: string;
  priority: TicketPriority;
}

export type ITicketStatus = 'todo' | 'progress' | 'done';
