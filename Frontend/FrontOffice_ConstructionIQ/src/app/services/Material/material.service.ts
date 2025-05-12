import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../../material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseUrl: string = 'http://localhost:8072/materials'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  // Obtenir tous les matériaux
  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.baseUrl}/get`);
  }

  // Trouver un matériau par nom
  findByMaterialName(materialName: string): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}/getbyname?materialName=${materialName}`);
  }

  // Créer un nouveau matériau
  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.baseUrl}/post`, material);
  }

  // Supprimer un matériau par ID
  deleteMaterial(materialID: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${materialID}`);
  }

  // Mettre à jour un matériau
  updateMaterial(material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.baseUrl}/update/${material.materialID}`, material);
  }

  // Obtenir un matériau par ID
  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.baseUrl}/${id}`);
  }
}
