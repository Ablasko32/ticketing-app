import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';
import { Toast } from './toast/toast';

@Component({
  selector: 'app-toasts-container',
  imports: [Toast],
  templateUrl: './toasts-container.html',
  styleUrl: './toasts-container.css',
})
export class ToastsContainer {
  private toastsService = inject(ToastService);

  toasts = this.toastsService.toasts;

  removeToast(toastId: string) {
    this.toastsService.removeToast(toastId);
  }
}
