import { Component, inject, OnInit, signal } from '@angular/core';
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
import { UserManagerService } from '../../core/services/userManager.service';
import { IUser } from '../../core/models/user.model';
import { AuthService } from '../../core/services/auth.service';
import { filter, map } from 'rxjs';
import { TextArea } from '../../shared/components/text-area/text-area';

@Component({
  selector: 'app-add-new',
  imports: [ReactiveFormsModule, FormInput, Button, FormSelect, BackButton, FileDropZone, TextArea],
  templateUrl: './add-new.html',
  styleUrl: './add-new.css',
})
export class AddNew implements OnInit {
  allUsers = signal<IUser[]>([]);

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
    asignedToUserId: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ticketFiles: new FormControl<IFile[]>([], { nonNullable: true }),
  });

  private ticketService = inject(TicketService);
  private toastService = inject(ToastService);
  private userManagerService = inject(UserManagerService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userManagerService
      .getAllUsers()
      .pipe(
        map((users) => {
          return users.filter((user) => this.authService.authStatus()?.userId !== user.id);
        })
      )
      .subscribe({
        next: (users) => {
          this.allUsers.set(users);
        },
      });
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, priority, ticketFiles, asignedToUserId } = this.form.getRawValue();

    console.log('ticketFiles');
    console.log(ticketFiles);

    this.ticketService
      .createNewTicket({ title, description, priority, ticketFiles, asignedToUserId })
      .subscribe({
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
