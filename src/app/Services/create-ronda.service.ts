import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, ObservedValueOf } from "rxjs";
import { environment } from "../Environment/environment";

@Injectable({
    providedIn: 'root'
})
export class RondaService {
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

    private URL_Novedad = environment.apiUrl + 'tipo-novedades';
    private URL_SubNovedad = environment.apiUrl + 'sub-novedades';
    private URL_Rondas = environment.apiUrl + 'rondas';
    private URL_Novedades = environment.apiUrl + 'novedades';
    private URL_Categoria = environment.apiUrl + 'sub-novedad-categoria';
    private URL_Torres = environment.apiUrl + 'torres';
    private URL_Pisos = environment.apiUrl + 'pisos';
    private URL_Areas = environment.apiUrl + 'areas';

    getTipoNovedad(): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Novedad, {headers});
    }

    getSubNovedad(id: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_SubNovedad + '/' + id, {headers});
    }

    getCategorias(id: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Categoria + '/' + id, {headers});
    }

    postRondas(body: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_Rondas,body,{headers});
    }

    //envía una solicitud POST al servidor con un cuerpo de datos (body) y unos encabezados (headers), y 
    //devuelve un Observable para manejar la respuesta de forma asíncrona.
    postNovedades(body: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_Novedades,body,{headers});
    }

    getNovedades(id: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Novedades + '/' + id, {headers});
    }

    //Adminitración Rondas
    postSubNovedad(body:any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_SubNovedad, body, {headers});
    }
    postCategorias(body:any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_Categoria, body, {headers});
    }
    postTorres(body:any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_Torres, body, {headers});
    }
    postPisos(body:any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_Pisos, body, {headers});
    }
    postAreas(body:any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.post<any>(this.URL_Areas, body, {headers});
    }
    getTorres(): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Torres, {headers});
    }
    getPisos(id: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Pisos + '/' + id, {headers});
    }
    getAreas(id: any): Observable<any>{
        const headers = this.getHeaders();
        return this.http.get<any>(this.URL_Areas + '/' + id, {headers});
    }
}