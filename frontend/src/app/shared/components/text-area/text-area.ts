import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './text-area.html',
  styleUrl: './text-area.css',
})
export class TextArea {
  id = input.required<string>();
  rows = input<number>(3);
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
