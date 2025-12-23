import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../../components/button/button';
import { Card } from '../../../components/card/card';
import { RouterLink } from '@angular/router';
import { FormInput } from '../../../components/form-input/form-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule, Button, Card, RouterLink, FormInput],
  standalone: true,
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

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
