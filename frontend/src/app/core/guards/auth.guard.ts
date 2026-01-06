import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';

export const authGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) {
    return true;
  }

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
