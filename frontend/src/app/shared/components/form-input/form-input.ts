import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  id = input.required<string>();
  type = input<'text' | 'email' | 'password' | 'number'>('text');
  label = input.required<string>();
  required = input<boolean>(true);
  control = input.required<FormControl>();
  errorMessage = input.required<string>();
  placeholder = input('');
  disabled = input<boolean>(false);

  get showError(): boolean {
    return !!(this.control()?.invalid && (this.control()?.dirty || this.control()?.touched));
  }
}
