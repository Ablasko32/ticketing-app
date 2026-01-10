import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../enviroments/enviroment';
import { TicketService } from './ticket.service';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs';

const TICKET_EVENTS = {
  newTicketAlert: 'NewTicketAlert',
  newCommentAlert: 'NewCommentAlert',
};

const INVOKE_TICKET_EVENTS = {
  joinTicketGroup: 'JoinTicketGroup',
  leaveTicketGroup: 'LeaveTicketGroup',
};

@Injectable({
  providedIn: 'root',
})
export class SignalRHubService {
  private hubConnection!: signalR.HubConnection;
  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);

  // SUBJECTS
  private commentSubject = new Subject<string>();
  commentSubject$ = this.commentSubject.asObservable();

  startConnection() {
    if (
      this.hubConnection?.state === signalR.HubConnectionState.Connected ||
      this.hubConnection?.state == signalR.HubConnectionState.Connecting
    ) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/notifications`, {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.registerTicketListeners();
    this.registerCommentListeners();

    //Starting conn
    this.hubConnection.start().catch((err) => console.error('Error connecting to SignalR Hub'));
  }

  private registerTicketListeners() {
    this.hubConnection.on(TICKET_EVENTS.newTicketAlert, (message: string) => {
      this.ticketService.refreshTickets();
      this.toastService.showToast({
        type: 'success',
        title: 'New ticket',
        message,
      });
    });
  }

  private registerCommentListeners() {
    this.hubConnection.on(TICKET_EVENTS.newCommentAlert, (message: string) => {
      this.commentSubject.next(message);
    });
  }

  joinTicketGroup(ticketId: number) {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .invoke(INVOKE_TICKET_EVENTS.joinTicketGroup, ticketId)
        .catch((err) => console.error('Error joining ticket group:', err));
    }
  }

  leaveTicketGroup(ticketId: number) {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .invoke(INVOKE_TICKET_EVENTS.leaveTicketGroup, ticketId)
        .catch((err) => console.error('Error leaving ticket group:', err));
    }
  }

  stopConnection() {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop();
    }
  }
}
