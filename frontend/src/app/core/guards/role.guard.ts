import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route?.data?.['role'];

  const authState = authService.authStatus();

  if (!authState || !authState.isAuthenticated) {
    return router.parseUrl('/login');
  }

  if (authState.role === requiredRole) {
    return true;
  }

  return router.parseUrl('/login');
};
