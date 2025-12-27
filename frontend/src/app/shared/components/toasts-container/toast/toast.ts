import { Component, input, output } from '@angular/core';
import { IToast } from '../../../../core/models/toast.model';
import { LucideAngularModule, XIcon } from 'lucide-angular';
import { Button } from '../../button/button';

@Component({
  selector: 'app-toast',
  imports: [LucideAngularModule, Button],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  toast = input.required<IToast>();
  closeIcon = XIcon;

  close = output<void>();

  closeToast() {
    this.close.emit();
  }
}
