import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null;
  }
  return {
    passwordMismatch: true,
  };
};
