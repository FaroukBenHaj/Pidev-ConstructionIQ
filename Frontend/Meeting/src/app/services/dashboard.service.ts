import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8050/PI_Project/api/stats'; // Base URL for the backend API

  constructor(private http: HttpClient) { }

  getFullStat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/full-report`);
  }

  getExtendedStat(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/extended-stats`);
  }
}