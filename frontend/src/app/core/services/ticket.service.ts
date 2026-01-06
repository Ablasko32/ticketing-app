import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ITicketCreate, ITicket, ITicketStatus } from '../models/ticket.model';
import { environment } from '../../enviroments/enviroment';

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

  getAllTickets() {
    return this.httpClient.get<ITicket[]>(this.API_URL);
  }

  getTicket(ticketId: string, includeComments = false) {
    return this.httpClient.get<ITicket>(
      `${this.API_URL}/${ticketId}?includeComments=${includeComments}`
    );
  }

  createNewTicket(ticket: ITicketCreate) {
    return this.httpClient.post<void>(this.API_URL, ticket);
  }

  updateTicketStatus(ticketId: string, status: ITicketStatus) {
    return this.httpClient.put<void>(`${this.API_URL}/${ticketId}`, { status });
  }

  deleteTicket(ticketId: string) {
    return this.httpClient.delete<void>(`${this.API_URL}/${ticketId}`);
  }
}
