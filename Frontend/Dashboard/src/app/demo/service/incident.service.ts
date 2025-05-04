import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.model';


@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://localhost:8081/api/incidents';

  constructor(private http: HttpClient) { }

  createIncident(incident: Incident): Observable<Incident> {
    return this.http.post<Incident>(this.baseUrl, incident);
  }

  updateIncident(id: number, incident: Incident): Observable<Incident> {
    return this.http.put<Incident>(`${this.baseUrl}/${id}`, incident);
  }

  deleteIncident(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(`${this.baseUrl}/${id}`);
  }

  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.baseUrl);
  }
}
