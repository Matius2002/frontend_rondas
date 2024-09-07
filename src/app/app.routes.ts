import { Routes } from '@angular/router';
import {TestingComponentComponent} from "./testing-component/testing-component.component";
import {RondasMainComponent} from "./Rondas/rondas-main/rondas-main.component";
import {LoginComponent} from "./Auth/login/login.component";
import {ForbiddenComponent} from "./Auth/forbidden/forbidden.component";
import { AppComponent } from "./app.component";
import { CreateRondaComponent } from "./Rondas/create-ronda/create-ronda.component";
import {SearchRondasComponent} from "./Rondas/search-rondas/search-rondas.component";
import { AuthGuard } from './auth.guard';
import { NovedadesComponent } from './Rondas/novedades/novedades.component';
import { RondasAdmComponent } from './Rondas/rondas-adm/rondas-adm.component';

export const routes: Routes =
  [
    // *** BASE *** //
    { path: '', component: AppComponent},
    // *** BASE *** //
    //

    // *** AUTHS *** //
    { path: 'login', component: LoginComponent },
    { path: 'forbidden', component: ForbiddenComponent },
    // *** AUTHS *** //

    // *** RONDAS *** //
      {
        path: 'rondas',
        component: RondasMainComponent,
        children: [
          { path: 'createRonda', component: CreateRondaComponent },
          { path: 'searchRonda', component: SearchRondasComponent },
          { path: 'novedades/:id', component: NovedadesComponent},
          { path: 'adminRonda', component: RondasAdmComponent},
          { path: '', redirectTo: '', pathMatch: 'full' } // Cambiado para redirigir a una ruta por defecto dentro de 'rondas'
        ]
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      //{ path: '**', redirectTo: '/login' },
    
    // *** RONDAS *** //

    // *** TESTS *** //
    { path: 'testing', component: TestingComponentComponent },
    // *** TESTS *** //
  ];
