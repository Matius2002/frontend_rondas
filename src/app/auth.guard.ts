// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './Services/Seguridad/auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login
      return false; // Bloquea el acceso
    }
  }
}
