import { Injectable } from '@angular/core';
import {environment} from "../Environment/environment";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface Privilegio
{ id: number, nombrePrivilegio: string, enabled: boolean }

interface Rol
{ id: number, nombreRol: string, enabled: boolean, privilegios: Privilegio[] }

@Injectable({
  providedIn: 'root'
})
export class RolesService
{
  dynamicHost = environment.dynamicHost;

  // URL Base API
  private baseUrl = `http://${this.dynamicHost}/api/roles`;

  // Create a Subject to emit Updates`
  private rolUpdateSubject = new Subject<void>();

  // Expose an observable to subscribe to updates
  rolUpdates$ = this.rolUpdateSubject.asObservable();
  constructor( private http: HttpClient ) { }

  // Get all Roles
  getAllRoles(isEnabled: boolean): Observable<Rol[]>
  {
    return this.http.get<Rol[]>(`${this.baseUrl}/showAll?isEnabled=${isEnabled}`)
  }
}
