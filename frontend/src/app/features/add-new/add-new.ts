import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../shared/components/form-input/form-input';
import { Button } from '../../shared/components/button/button';
import { FormSelect } from '../../shared/components/form-select/form-select';
import { TicketPriority } from '../../core/constants/ticket.constants';
import { BackButton } from '../../shared/components/back-button/back-button';
import { TicketService } from '../../core/services/ticket.service';
import { ToastService } from '../../core/services/toast.service';
import { Router } from '@angular/router';
import { FileDropZone, IFile } from '../../shared/components/file-drop-zone/file-drop-zone';

@Component({
  selector: 'app-add-new',
  imports: [ReactiveFormsModule, FormInput, Button, FormSelect, BackButton, FileDropZone],
  templateUrl: './add-new.html',
  styleUrl: './add-new.css',
})
export class AddNew {
  priorities = [
    { value: TicketPriority.LOW, name: 'Low' },
    { value: TicketPriority.MEDIUM, name: 'Medium' },
    { value: TicketPriority.HIGH, name: 'High' },
  ];

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    priority: new FormControl<TicketPriority>(TicketPriority.LOW, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ticketFiles: new FormControl<IFile[]>([], { nonNullable: true }),
  });

  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, priority, ticketFiles } = this.form.getRawValue();

    console.log('ticketFiles');
    console.log(ticketFiles);

    this.ticketService.createNewTicket({ title, description, priority, ticketFiles }).subscribe({
      next: () => {
        this.handleReset();
        this.ticketService.refreshTickets();
        this.toastService.showToast({
          title: 'Ticket created',
          message: 'Ticket created successfully',
          type: 'success',
        });
        this.router.navigate(['app', 'tickets']);
      },
      error: (error) => {
        this.toastService.showToast({
          title: 'Ticket creation failed',
          message: 'Ticket creation failed',
          type: 'error',
        });
        console.error(error);
      },
    });
  }

  handleReset() {
    this.form.reset();
  }
}
