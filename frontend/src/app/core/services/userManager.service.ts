import { inject, Injectable } from '@angular/core';

import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

  getAllUsers() {
    return this.httpClient.get<IUser[]>(`${this.apiUrl}/auth/all-users`);
  }
}
