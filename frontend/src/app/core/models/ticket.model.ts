import { IFile } from '../../shared/components/file-drop-zone/file-drop-zone';
import { TicketPriority } from '../constants/ticket.constants';

export interface ITicket {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  status: ITicketStatus;
  priority: TicketPriority;
  ticketComments?: ITicketComment[];
  mediaEntries?: ITicketMedia[];
  asignedUserName: string;
}

export interface ITicketComment {
  id: number;
  content: string;
  createdByUserId: string;
  dateCreated: string;
  username: string;
}

export interface ITicketMedia {
  id: string;
  relativePath: string;
  dateCreated: string;
}

export interface ITicketCreate {
  title: string;
  description: string;
  priority: TicketPriority;
  ticketFiles: IFile[];
  asignedToUserId: string;
}

export type ITicketStatus = 'todo' | 'progress' | 'done';
