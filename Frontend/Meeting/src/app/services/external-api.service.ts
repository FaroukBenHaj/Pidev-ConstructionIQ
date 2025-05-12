import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ExternalApiService {
  private apiUrl = 'http://localhost:8050/PI_Project/api/meetings';

  constructor(private http: HttpClient) { }

  createMeetingLink(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/create`);
  }
}