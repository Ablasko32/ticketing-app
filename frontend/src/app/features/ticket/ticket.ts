import { Component, computed, inject, signal, Signal } from '@angular/core';
import { ITicket, ITicketMedia } from '../../core/models/ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BackButton } from '../../shared/components/back-button/back-button';
import { DatePipe } from '@angular/common';
import { LucideAngularModule, PlusIcon, Eye, Download, Trash } from 'lucide-angular';
import { PriorityFlames } from '../tickets/ticket/priority-flames/priority-flames';
import { TicketComments } from './ticket-comments/ticket-comments';
import { Button } from '../../shared/components/button/button';
import { ModalService } from '../../core/services/modal.service';
import { AddNew } from './ticket-comments/add-new/add-new';
import { environment } from '../../enviroments/enviroment';
import { TicketService } from '../../core/services/ticket.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-ticket',
  imports: [BackButton, DatePipe, LucideAngularModule, PriorityFlames, TicketComments, Button],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket {
  loading = signal(false);

  private activatedRoute = inject(ActivatedRoute);
  private data = toSignal(this.activatedRoute.data);
  private modalService = inject(ModalService);
  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  plusIcon = PlusIcon;
  eyeIcon = Eye;
  downloadIcon = Download;
  trashIcon = Trash;

  ticketData: Signal<ITicket> = computed(() => this.data()!['ticketData']);

  isViwableFileType(relativePath: string) {
    const fileType = relativePath.split('.').pop()?.toLowerCase() || '';
    const allowedFileTypes = ['jpg', 'png', 'webp', 'svg', 'pdf', 'avif', 'jpeg', 'gif'];
    return allowedFileTypes.includes(fileType);
  }

  handleOpenModal() {
    this.modalService.setOpen(AddNew, { ticketId: this.ticketData().id });
  }

  openFile(media: ITicketMedia) {
    this.loading.set(true);
    this.ticketService.getTicketMediaFile(media.id.toString()).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          title: 'Error previewing file',
          message: 'An error occured while fetching file',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  downloadFile(media: ITicketMedia) {
    this.loading.set(true);
    this.ticketService.getTicketMediaFile(media.id.toString()).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.download = media.relativePath;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          title: 'Error downloading file',
          message: 'An error occured while downloading file',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  handleDeleteFile(mediaId: string) {
    this.loading.set(true);
    this.ticketService.deleteTicketMediaFile(Number(mediaId)).subscribe({
      next: () => {
        this.toastService.showToast({
          type: 'success',
          title: 'File deleted',
          message: 'File has been deleted succesfully',
        });
        this.router.navigate([]);
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          title: 'Error deleting file',
          message: 'An error occured while deleting file',
        });
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
