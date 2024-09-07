import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

    private apiUrl = 'https://backend-pro-production.up.railway.app/authentication';

    login(body: any[]): Observable<boolean> {
        return this.http.post<{ token: string }>(this.apiUrl,body ).pipe(
          map(response => {
            if (response.token) {
              localStorage.setItem('token', response.token);
              return true;
            } else {
              return false;
            }
          }),
          catchError(() => of(false)) // Manejo de errores
        );
      }
    isAuthenticated(): boolean {
        // Verifica si el usuario está autenticado, por ejemplo, comprobando la existencia de un token en localStorage
        return !!localStorage.getItem('token');
    }

}