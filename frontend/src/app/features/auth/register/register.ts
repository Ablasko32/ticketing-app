import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { confirmPasswordValidator } from '../../../shared/validators/confirm-password';
import { AuthService } from '../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { FormInput } from '../../../shared/components/form-input/form-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [ReactiveFormsModule, Button, Card, RouterLink, FormInput],
  standalone: true,
})
export class RegisterComponent {
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
      organizationName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        nonNullable: true,
      }),
    },
    { validators: [confirmPasswordValidator] }
  );

  get isSubmitDisabled() {
    return this.form.invalid || this.loading();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password, organizationName } = this.form.getRawValue();
    this.errorMessage.set(null);
    this.loading.set(true);
    this.authService
      .registerAdmin({
        email,
        password,
        organizationName,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.loading.set(false);
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.loading.set(false);
          this.errorMessage.set(err.error[0]?.description || 'An unexpected error occured');
        },
      });
  }
}
