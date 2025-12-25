import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IAuthResponse, IAuthStatus, ILoginData, IRegisterData } from '../models/auth.models';
import { environment } from '../../enviroments/enviroment';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  public authStatus = signal<IAuthStatus | undefined>(undefined);

  private httpClient = inject(HttpClient);

  registerAdmin(data: IRegisterData) {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/register-admin`, data);
  }

  login(data: ILoginData) {
    return this.httpClient
      .post<IAuthResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(switchMap((val) => this.status().pipe(map(() => val))));
  }

  logout() {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.authStatus.set(undefined);
      })
    );
  }

  status() {
    return this.httpClient.get<IAuthStatus>(`${this.apiUrl}/auth/status`).pipe(
      tap((res) => {
        this.authStatus.set(res);
      }),
      catchError((err) => {
        this.authStatus.set(undefined);
        return throwError(() => err);
      })
    );
  }
}
