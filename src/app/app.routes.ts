import { Routes } from '@angular/router';
import path from 'node:path';
import { VistaComponent } from './vista/vista.component';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
    {path:'rondas-tecnologia', component: VistaComponent} //Agregso la ruta de rondas tecnologia
];
