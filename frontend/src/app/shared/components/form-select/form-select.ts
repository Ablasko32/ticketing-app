import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface ISelectOptions {
  [key: string]: any;
}

@Component({
  selector: 'app-form-select',
  imports: [ReactiveFormsModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.css',
  standalone: true,
})
export class FormSelect<T extends ISelectOptions> {
  control = input.required<FormControl>();
  id = input.required<string>();
  label = input.required<string>();
  required = input<boolean>(true);
  options = input.required<T[]>();
  nameKey = input<keyof T>('name');
  valueKey = input<keyof T>('id');
  errorMessage = input.required<string>();

  get showError(): boolean {
    return !!(this.control()?.invalid && (this.control()?.dirty || this.control()?.touched));
  }
}
