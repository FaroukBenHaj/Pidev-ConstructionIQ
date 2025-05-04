import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inspection } from 'src/models/inspection.model';

@Injectable({
  providedIn: 'root'
})
export class InspectionService {
  private baseUrl = 'http://localhost:8081/api/inspections';

  constructor(private http: HttpClient) { }

  createInspection(inspection: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>(this.baseUrl, inspection);
  }

  updateInspection(id: number, inspection: Inspection): Observable<Inspection> {
    return this.http.put<Inspection>(`${this.baseUrl}/${id}`, inspection);
  }

  deleteInspection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getInspectionById(id: number): Observable<Inspection> {
    return this.http.get<Inspection>(`${this.baseUrl}/${id}`);
  }

  getAllInspections(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(this.baseUrl);
  }
}
