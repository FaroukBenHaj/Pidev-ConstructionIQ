import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/construction/projects';

  constructor(private http: HttpClient) { }

  sendProjectNotification(
    projectId: number, 
    email: string, 
    subject: string, 
    message: string
  ): Observable<string> {
    const params = new HttpParams()
      .set('email', email)
      .set('subject', subject)
      .set('message', message);

    return this.http.post<string>(
      `${this.apiUrl}/${projectId}/notify`, 
      null, 
      { params }
    );
  }
}