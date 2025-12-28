import { Component, inject, viewChild } from '@angular/core';
import { Button } from '../button/button';
import { ModalService } from '../../../core/services/modal.service';
import { LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-modal',
  imports: [Button, LucideAngularModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  host: {
    '(click)': 'onBackdropClick($event)',
  },
})
export class Modal {
  private modalService = inject(ModalService);
  xIcon = X;

  closeModal() {
    this.modalService.closeModal();
  }

  onBackdropClick(e: Event) {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  }
}
