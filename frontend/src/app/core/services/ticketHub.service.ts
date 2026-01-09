import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../enviroments/enviroment';
import { TicketService } from './ticket.service';
import { ToastService } from './toast.service';

const TICKET_EVENTS = {
  newTicketAlert: 'NewTicketAlert',
};

@Injectable({
  providedIn: 'root',
})
export class TicketHubService {
  private hubConnection!: signalR.HubConnection;
  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);

  startConnection() {
    if (
      this.hubConnection?.state === signalR.HubConnectionState.Connected ||
      this.hubConnection?.state == signalR.HubConnectionState.Connecting
    ) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/ticketHub`, {
        withCredentials: true,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.registerListeners();

    //Starting conn
    this.hubConnection.start().catch((err) => console.error('Error connecting to SignalR Hub'));
  }

  private registerListeners() {
    this.hubConnection.on(TICKET_EVENTS.newTicketAlert, (message: string) => {
      this.ticketService.refreshTickets();
      this.toastService.showToast({
        type: 'success',
        title: 'New ticket',
        message,
      });
    });
  }

  stopConnection() {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop();
    }
  }
}
