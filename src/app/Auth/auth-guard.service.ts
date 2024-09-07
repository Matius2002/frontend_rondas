import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {UsuariosService} from "./usuarios.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService
{
  private clearanceLevel!: number;
  private currentClearance!: number;
  private username!: string;

  constructor(private router: Router, private usuarioService: UsuariosService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean
  {
    const username = localStorage.getItem('username');
    if (username)
    {
      this.clearanceLevel = route.data['clearanceRequired'];
      this.usuarioService.checkClearanceByEmail(username).subscribe(clearance =>
      {
        this.currentClearance = clearance;

        if (this.currentClearance == -1) { this.router.navigate(['/login']); /**/ return false; }
        else
        {
          console.log(`Clearance Required: ${this.clearanceLevel}`);
          console.log(`Current Clearance: ${this.currentClearance}`);
          if (<number> this.currentClearance >= <number> this.clearanceLevel)
          {
            console.log("CLEARANCE SUPERADA") // Superó Clearance

            if (route.data['privilegeRequired'])
            {
              const privilegiosRequeridos: number = route.data['privilegeRequired'];

              console.log("REQUIERE PRIVILEGIOS") // Probando Privilegios

              this.usuarioService.checkPrivilegeByEmail(username).subscribe(response =>
              {
                if (response == null)
                {
                  console.log("EL USUARIO NO TIENE PRIVILEGIOS NECESARIOS");
                  this.router.navigate(['/forbidden']);
                  return false
                }
                else
                {
                  const privilegiosUsuario: number[] = response;

                  if (privilegiosUsuario.indexOf(privilegiosRequeridos) == -1)
                  {
                    console.log("EL USUARIO NO TIENE PRIVILEGIOS NECESARIOS");
                    this.router.navigate(['/forbidden']);
                    return false;
                  }
                  else
                  {
                    console.log("EL USUARIO TIENE PRIVILEGIOS NECESARIOS");
                    return true;
                  }
                }
              })

              return false;
            }
            else
            {
              console.log("NO REQUIERE PRIVILEGIOS")
              return true;
            }
          }
          else
          { this.router.navigate(['/forbidden']); /**/ return false; }
        }
      })

      return true;
    }
    else { this.router.navigate(['login']); /**/ return false; }
  }

  checkPermissions(): boolean
  {
    return true;
  }
}
