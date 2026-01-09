import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { Button } from '../../../../shared/components/button/button';
import { TicketService } from '../../../../core/services/ticket.service';
import { ToastService } from '../../../../core/services/toast.service';
import { ModalService } from '../../../../core/services/modal.service';
import { Router } from '@angular/router';
import { TextArea } from '../../../../shared/components/text-area/text-area';

@Component({
  selector: 'app-add-new',
  imports: [ReactiveFormsModule, TextArea, Button, TextArea],
  templateUrl: './add-new.html',
  styleUrl: './add-new.css',
})
export class AddNew {
  ticketId!: string;
  form = new FormGroup({
    content: new FormControl('', { nonNullable: true, validators: [Validators.minLength(2)] }),
  });

  loading = signal(false);

  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }

    const { content } = this.form.getRawValue();

    this.loading.set(true);
    this.ticketService.createTicketComment(content, this.ticketId.toString()).subscribe({
      next: () => {
        this.toastService.showToast({
          type: 'success',
          title: 'Comment posted',
          message: 'Comment has succesfully been posted',
        });
        this.modalService.closeModal();
        this.router.navigate([]);
      },
      error: () => {
        this.toastService.showToast({
          type: 'error',
          title: 'Error commenting',
          message: 'There has been error posting comment',
        });
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
