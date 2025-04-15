import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8081/construction/projects';

  constructor(private http: HttpClient) {}

  uploadPdf(file: FormData): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/upload-pdf`, file);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/list_projects`);
  }
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  deleteProject(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }
  searchProjects(query: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/search?name=${query}`);
  }
  getProjectByName(name: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/name/${name}`);
  }
  
}