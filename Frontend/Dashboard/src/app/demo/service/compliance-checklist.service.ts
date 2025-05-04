import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComplianceChecklist } from '../models/compliance-checklist.model';

@Injectable({
  providedIn: 'root'
})
export class ComplianceChecklistService {
  private baseUrl = 'http://localhost:8081/api/compliance-checklists';

  constructor(private http: HttpClient) { }

  createComplianceChecklist(inspectionId: number, checklist: ComplianceChecklist): Observable<ComplianceChecklist> {
    return this.http.post<ComplianceChecklist>(`${this.baseUrl}/inspection/${inspectionId}`, checklist);
  }

  updateComplianceChecklist(id: number, inspectionId: number, checklist: ComplianceChecklist): Observable<ComplianceChecklist> {
    return this.http.put<ComplianceChecklist>(`${this.baseUrl}/${id}/inspection/${inspectionId}`, checklist);
  }

  deleteComplianceChecklist(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getComplianceChecklistById(id: number): Observable<ComplianceChecklist> {
    return this.http.get<ComplianceChecklist>(`${this.baseUrl}/${id}`);
  }

  getAllComplianceChecklists(): Observable<ComplianceChecklist[]> {
    return this.http.get<ComplianceChecklist[]>(this.baseUrl);
  }
}
