import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../Environment/environment";

interface Privilegio
{ id: number, nombrePrivilegio: string, enabled: boolean }

interface Rol
{ id: number, nombreRol: string, enabled: boolean, privilegios: Privilegio[] }

interface Usuario
{
  id: number; nombres: string; apellidos: string; identificationNumber: string;
  telefono: string; roles: Rol[]
  email: string;password: string; clearance: number;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService
{
  dynamicHost = environment.dynamicHost;
  // URL Base API
  private baseUrl = `http://${this.dynamicHost}/api/usuarios`;

  // Create a Subject to emit updates
  private usuarioUpdateSubject = new Subject<void>();

  // Expose an observable to subscribe to updates
  usuarioUpdates$ = this.usuarioUpdateSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Save Usuario
  saveUser(newUsuario: Usuario): Observable<Usuario>
  { return this.http.post<Usuario>(`${this.baseUrl}/save`, newUsuario); }

  // Check Usuario by Name
  checkUserByName(nombres: string): Observable<boolean>
  { return this.http.get<boolean>(`${this.baseUrl}/check/nombres?nombres=${nombres.trim()}`); }

  // Check Usuario by Apellido
  checkUserBySurname(apellidos: string): Observable<boolean>
  { return this.http.get<boolean>(`${this.baseUrl}/check/apellidos?apellidos=${apellidos.trim()}`); }

  // Check Usuario by Email
  checkUserByEmail(email: string): Observable<boolean>
  { return this.http.get<boolean>(`${this.baseUrl}/check/email?email=${email.trim()}`); }

  // Check Roles by Email
  checkRolesByEmail(email: string): Observable<string[]>
  { return this.http.get<string[]>(`${this.baseUrl}/check/roles?email=${email.trim()}`); }

  // Check Clearance by Email
  checkClearanceByEmail(email: string): Observable<number>
  { return this.http.get<number>(`${this.baseUrl}/check/clearance?email=${email.trim()}`); }

  // Check Privileges by Email
  checkPrivilegeByEmail(email: string): Observable<number[]>
  { return this.http.get<number[]>(`${this.baseUrl}/check/privileges?email=${email.trim()}`); }

  // Check Password
  checkPassword(user: Usuario): Observable<boolean>
  { return this.http.post<boolean>(`${this.baseUrl}/check/password`, user) }

  // Check Usuario by Numero Identificacion
  checkUserByNumeroIdentificacion(identificationNumber: string): Observable<boolean>
  { return this.http.get<boolean>(`${this.baseUrl}/check/identificationNumber?identificationNumber=${<string> identificationNumber}`); }
}
