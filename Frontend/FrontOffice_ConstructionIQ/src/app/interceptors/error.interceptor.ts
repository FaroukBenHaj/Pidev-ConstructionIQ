// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            
            // Traiter les erreurs spécifiques
            switch (error.status) {
              case 401:      // Unauthorized
                errorMessage = 'Vous n\'êtes pas autorisé à accéder à cette ressource.';
                break;
              case 403:      // Forbidden
                errorMessage = 'Accès interdit.';
                break;
              case 404:      // Not Found
                errorMessage = 'Ressource non trouvée.';
                break;
              case 500:      // Internal Server Error
                errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
                break;
              default:
                errorMessage = `Une erreur s'est produite: ${error.message}`;
                break;
            }
          }
          
          // Afficher la notification d'erreur
          this.notificationService.error(errorMessage);
          
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}