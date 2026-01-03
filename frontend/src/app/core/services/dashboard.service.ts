import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { IDashboardStats } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly API_URL = `${environment.apiUrl}/dashboard`;
  private readonly httpClient = inject(HttpClient);

  getDashboardStats() {
    return this.httpClient.get<IDashboardStats>(`${this.API_URL}`);
  }
}
