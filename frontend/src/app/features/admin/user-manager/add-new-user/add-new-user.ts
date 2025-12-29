import { Component, signal } from '@angular/core';
import { FormInput } from '../../../../shared/components/form-input/form-input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';
import { ToastService } from '../../../../core/services/toast.service';
import { inject } from '@angular/core';
import { UserManagerService } from '../../../../core/services/userManager.service';
import { ModalService } from '../../../../core/services/modal.service';

@Component({
  selector: 'app-add-new-user',
  imports: [FormInput, ReactiveFormsModule, Button],
  templateUrl: './add-new-user.html',
  styleUrl: './add-new-user.css',
})
export class AddNewUser {
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private userManagerService = inject(UserManagerService);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();

    this.loading.set(true);
    this.userManagerService.registerUser({ email, password, role: 'user' }).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.errorMessage.set(null);
        this.toastService.showToast({
          title: 'Success',
          message: response.message,
          type: 'success',
        });

        this.modalService.closeModal();
        this.userManagerService.refreshUsers();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'An unexpected error has occured');
        this.toastService.showToast({
          title: 'Error',
          message: err.error?.message || 'An unexpected error has occured',
          type: 'error',
        });
      },
    });
  }
}
