import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const redirectUrlTree = router.parseUrl('/app');

  const authStatus = authService.authStatus();

  if (authStatus?.isAuthenticated) {
    return redirectUrlTree;
  }

  if (authStatus !== undefined && !authStatus.isAuthenticated) {
    return true;
  }

  return authService.status().pipe(
    map((res) => {
      if (res.isAuthenticated) {
        return redirectUrlTree;
      }
      return true;
    }),
    catchError((err) => of(true))
  );
};
