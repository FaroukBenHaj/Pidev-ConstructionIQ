import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {
  private apiUrl = 'http://localhost:8050/PI_Project/attendees'; // Base URL for the backend API

  constructor(private http: HttpClient) { }

  // Add an attendee to a meeting
  addAttendee(meetingTitle: string, attendee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${meetingTitle}`, attendee);
  }

  // Get attendees by meeting title
  getAttendeesByMeetingTitle(meetingTitle: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/meeting/${meetingTitle}`);
  }

  // Delete an attendee by name
  deleteAttendeeByName(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/name/${name}`);
  }

  // Update an attendee by name
  updateAttendeeByName(name: string, updatedAttendee: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/name/${name}`, updatedAttendee);
  }
}