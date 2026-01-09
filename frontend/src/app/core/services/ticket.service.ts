import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITicketCreate, ITicket, ITicketStatus, ITicketComment } from '../models/ticket.model';
import { environment } from '../../enviroments/enviroment';
import { TFilter } from '../../features/tickets/ticket-filter/ticket-filter';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private refresh = new Subject<void>();
  refresh$ = this.refresh.asObservable();

  private readonly API_URL = `${environment.apiUrl}/ticket`;
  private httpClient = inject(HttpClient);

  refreshTickets() {
    this.refresh.next();
  }

  getAllTickets(filter: TFilter) {
    return this.httpClient.get<ITicket[]>(`${this.API_URL}/?filter=${filter}`);
  }

  getTicket(ticketId: string, includeComments = false) {
    return this.httpClient.get<ITicket>(
      `${this.API_URL}/${ticketId}?includeComments=${includeComments}`
    );
  }

  createNewTicket(ticket: ITicketCreate) {
    const formData = new FormData();
    formData.append('title', ticket.title);
    formData.append('description', ticket.description);
    formData.append('priority', ticket.priority);
    formData.append('asignedToUserId', ticket.asignedToUserId);
    if (ticket.ticketFiles && ticket.ticketFiles.length > 0) {
      ticket.ticketFiles.forEach((f) => {
        formData.append('ticketFiles', f.file);
      });
    }
    return this.httpClient.post<void>(this.API_URL, formData);
  }

  updateTicketStatus(ticketId: string, status: ITicketStatus) {
    return this.httpClient.put<void>(`${this.API_URL}/${ticketId}`, { status });
  }

  deleteTicket(ticketId: string) {
    return this.httpClient.delete<void>(`${this.API_URL}/${ticketId}`);
  }

  //Ticket Comments
  createTicketComment(content: string, ticketId: string) {
    return this.httpClient.post<ITicketComment>(`${this.API_URL}/comment`, { content, ticketId });
  }
  deleteTicketComment(commentId: number) {
    return this.httpClient.delete<void>(`${this.API_URL}/comment/${commentId.toString()}`);
  }

  // Ticket media
  deleteTicketMediaFile(mediaId: number) {
    return this.httpClient.delete<void>(`${this.API_URL}/media/${mediaId.toString()}`);
  }

  getTicketMediaFile(mediaId: string) {
    return this.httpClient.get(`${this.API_URL}/media/${mediaId}`, {
      responseType: 'blob',
    });
  }
}
