import { Injectable, signal } from '@angular/core';
import { IToast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<IToast[]>([]);
  private readonly MAX_TOASTS = 5;
  private timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  showToast(toastOptions: Omit<IToast, 'id'>) {
    const id = crypto.randomUUID();
    const toast: IToast = {
      duration: 3000,
      ...toastOptions,
      id,
    };

    this.toasts.update((toasts) => [...toasts, toast]);

    if (this.toasts().length >= this.MAX_TOASTS) {
      this.removeToast(this.toasts().at(0)!.id);
    }

    if (toast.duration && toast.duration > 0) {
      this.timeouts.set(
        id,
        setTimeout(() => this.removeToast(id), toast.duration)
      );
    }
  }

  removeToast(id: string) {
    const timeoutId = this.timeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(id);
    }
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
