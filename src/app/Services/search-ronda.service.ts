import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../Environment/environment";

@Injectable({
    providedIn: 'root'
})
export class SearchRondaService {
    constructor(private http: HttpClient) {}

    private getToken(): string | null {
        return localStorage.getItem('token');
    }
    
    // Método para construir los encabezados con el token Bearer
    private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
    }

    private URL_Ronda = environment.apiUrl + 'rondas';


    getRonda(): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Ronda, {headers});
    }


    deleteRonda(id: any): Observable<any>{
        const headers = this.getHeaders();
        /*return this.http.delete<any>(this.URL_Ronda + '/' + id, {headers})*/
        return this.http.delete(this.URL_Ronda + '/' + id, {headers, responseType: 'text'}); /*Aquí maneja la respuesta como texto*/
    }

}