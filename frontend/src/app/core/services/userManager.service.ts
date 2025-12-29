import { inject, Injectable } from '@angular/core';

import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { IAuthResponse, IRegisterUserData } from '../models/auth.models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  private refresh = new Subject<void>();
  refresh$ = this.refresh.asObservable();

  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  refreshUsers() {
    this.refresh.next();
  }

  getAllUsers() {
    return this.httpClient.get<IUser[]>(`${this.apiUrl}/auth/all-users`);
  }

  registerUser(data: IRegisterUserData) {
    return this.httpClient.post<IAuthResponse>(`${this.apiUrl}/auth/register-user`, data);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/auth/delete-user/${id}`);
  }
}
