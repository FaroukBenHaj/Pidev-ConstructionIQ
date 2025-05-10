import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from './material.model';


@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl: string = 'http://localhost:8076/materials'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  // Obtenir tous les matériaux
  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.baseUrl}/get`);
  }

  // Trouver un matériau par nom
  findByMaterialName(materialName: string): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}?materialName=${materialName}`);
  }

  // Obtenir un matériau par ID
  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouveau matériau
  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.baseUrl}/post`, material);
  }

  // Supprimer un matériau par ID
  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
