// src/app/services/mistral.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MistralService {
  private apiUrl = 'http://localhost:8050/PI_Project/PI_Project/mistral/ask';
  
  constructor(private http: HttpClient) { }

  askChat(message : string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, message, { responseType: 'text' });
  }

}