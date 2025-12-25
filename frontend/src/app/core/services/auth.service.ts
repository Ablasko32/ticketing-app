import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuthResponse, ILoginData, IRegisterData } from '../models/auth.models';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);

  registerAdmin(data: IRegisterData) {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/register-admin`, data);
  }

  login(data: ILoginData) {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/login`, data);
  }
}
