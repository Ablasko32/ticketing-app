import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInput } from '../../shared/components/form-input/form-input';
import { Button } from '../../shared/components/button/button';
import { FormSelect } from '../../shared/components/form-select/form-select';
import { TicketPriority } from '../../core/constants/ticket.constants';
import { BackButton } from '../../shared/components/back-button/back-button';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-add-new',
  imports: [ReactiveFormsModule, FormInput, Button, FormSelect, BackButton],
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
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
  });

  private ticketService = inject(TicketService);

  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { title, description, priority } = this.form.getRawValue();
    console.log(title, description, priority);

    // TICKET CREATION
  }

  handleReset() {
    this.form.reset();
  }
}
