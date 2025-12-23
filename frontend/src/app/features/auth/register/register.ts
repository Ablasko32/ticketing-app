import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../../components/button/button';
import { Card } from '../../../components/card/card';
import { RouterLink } from '@angular/router';
import { FormInput } from '../../../components/form-input/form-input';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [ReactiveFormsModule, Button, Card, RouterLink, FormInput],
  standalone: true,
})
export class RegisterComponent {
  form = new FormGroup(
    {
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      organizationName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
    },
    { validators: [confirmPasswordValidator] }
  );

  get isSubmitDisabled() {
    return this.form.invalid && this.form.touched;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
