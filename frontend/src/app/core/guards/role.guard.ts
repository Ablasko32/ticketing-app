import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRole = route.data['role'];

  const authState = authService.authStatus();

  if (!authState || !authState.isAuthenticated) {
    return router.parseUrl('/login');
  }

  if (authState.role === requiredRole) {
    return true;
  }

  //TODO: IF auth but wrong role, login for now
  return router.parseUrl('/login');
};
