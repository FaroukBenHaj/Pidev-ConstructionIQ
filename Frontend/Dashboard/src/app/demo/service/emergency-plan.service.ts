import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmergencyPlan } from '../models/emergency-plan.model';

@Injectable({
  providedIn: 'root'
})
export class EmergencyPlanService {
  private baseUrl = 'http://localhost:8081/api/emergency-plans';

  constructor(private http: HttpClient) { }

  createEmergencyPlan(plan: EmergencyPlan): Observable<EmergencyPlan> {
    return this.http.post<EmergencyPlan>(this.baseUrl, plan);
  }

  updateEmergencyPlan(id: number, plan: EmergencyPlan): Observable<EmergencyPlan> {
    return this.http.put<EmergencyPlan>(`${this.baseUrl}/${id}`, plan);
  }

  deleteEmergencyPlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEmergencyPlanById(id: number): Observable<EmergencyPlan> {
    return this.http.get<EmergencyPlan>(`${this.baseUrl}/${id}`);
  }

  getAllEmergencyPlans(): Observable<EmergencyPlan[]> {
    return this.http.get<EmergencyPlan[]>(this.baseUrl);
  }
}
