import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { FormInput } from '../../../shared/components/form-input/form-input';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [ReactiveFormsModule, Button, Card, RouterLink, FormInput],
  standalone: true,
})
export class LoginComponent {
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  get isSubmitDisabled() {
    return this.form.invalid || this.loading();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.errorMessage.set(null);
    this.loading.set(true);
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log(response.message);
        this.loading.set(false);
        this.router.navigate(['app']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'An unexpected error has occured');
      },
    });
  }
}
