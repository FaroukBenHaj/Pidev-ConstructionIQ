import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Stock } from '../models/stock.model';  // Import the Stock model to define the data structure

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:8072/stocks'; // Assurez-vous que l'URL de l'API est correcte

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les stocks
  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des stocks', error);
        return throwError(() => new Error('Erreur lors de la récupération des stocks'));
      })
    );
  }

  // Méthode pour récupérer un stock par ID
  getStockById(id: number): Observable<Stock> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Stock>(url).pipe(
      catchError(error => {
        console.error(`Erreur lors de la récupération du stock avec l'ID ${id}`, error);
        return throwError(() => new Error(`Erreur lors de la récupération du stock avec l'ID ${id}`));
      })
    );
  }

  createStock(stock: Stock): Observable<Stock> {
    const url = `${this.apiUrl}/post`;  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    console.log('Données envoyées au backend:', stock); // Assurez-vous que les données envoyées sont correctes
  
    return this.http.post<Stock>(url, stock, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du stock', error);
        return throwError(() => new Error('Erreur lors de l\'ajout du stock'));
      })
    );
  }
  

  // Méthode pour supprimer un stock par ID
  deleteStock(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(error => {
        console.error(`Erreur lors de la suppression du stock avec l'ID ${id}`, error);
        return throwError(() => new Error(`Erreur lors de la suppression du stock avec l'ID ${id}`));
      })
    );
  }
}
