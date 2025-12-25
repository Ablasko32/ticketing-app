import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const redirectUrlTree = router.parseUrl('login');

  const currentStatus = authService.authStatus();

  if (currentStatus?.isAuthenticated) {
    return true;
  }

  if (currentStatus !== undefined && currentStatus.isAuthenticated === false) {
    return redirectUrlTree;
  }

  return authService.status().pipe(
    map((status) => {
      if (status.isAuthenticated) {
        return true;
      }
      return redirectUrlTree;
    }),
    catchError(() => of(redirectUrlTree))
  );
};
