import { Routes } from '@angular/router';
import { VistaComponent } from './vista/vista.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    { path:'contenedor',component: ContenedorComponent},
    { path:'rondas-tecnologia', component: VistaComponent},

];
