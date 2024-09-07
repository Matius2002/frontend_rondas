import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { RondaService } from '../../Services/create-ronda.service';

@Component({
  selector: 'app-rondas-adm',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './rondas-adm.component.html',
  styleUrl: './rondas-adm.component.css'
})
export class RondasAdmComponent implements OnInit {
  isModalOpen: boolean = false;
  tittle: any;
  descripcion: any;
  form:any;
  nombreTorre: any;
  nombreArea: any;
  nombrePiso: any;
  arrayConst: any;
  torres: any[] = [];
  pisos: any[] = [];
  subNovedades: any[] = [];

  formulario: FormGroup;

  constructor( private apiService: RondaService ) {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      id: new FormControl(''),   // Campo de selección
      id2: new FormControl('')   // Campo de selección
    });
  }
  ngOnInit(): void {
    this.apiService.getTorres().subscribe(resdata => {
      this.torres = resdata;
    });
    this.apiService.getSubNovedad(3).subscribe(resdata => {
      this.subNovedades = resdata;
    })
  }
  getPisos(){
    const selectedValue = this.formulario.get('id')?.value;
    this.apiService.getPisos(selectedValue).subscribe(resdata => {
      this.pisos = resdata;
    });
  }

  // Método para abrir el modal
  openModal(id:any) {
    this.isModalOpen = true;
    switch (id) {
      case 1:
        this.tittle = "Tipo de Novedad Tecnologica";
        this.form  = 1;
      break;
      case 2:
        this.tittle = "Torres"; 
        this.form  = 2;
      break;
      case 3:        
        this.tittle = "Pisos"; 
        this.form  = 3;
      break;
      case 4:
        this.tittle = "Areas";
        this.form = 4;
      break;
      case 5:
        this.tittle = "Categoria";
        this.form = 5;
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Método para manejar la sumisión del formulario
  onSubmit() {
    if (this.formulario.valid) {
      switch (this.form) {
        case 1:
          this.arrayConst = {
            nombreSubNovedad : this.formulario.value.nombre,
            novedadId : 3
          };
          this.apiService.postCategorias(this.arrayConst).subscribe();
        break;
        case 2:
          this.arrayConst = {
            nombreTorre : this.formulario.value.nombre
          };
          this.apiService.postTorres(this.arrayConst).subscribe();
        break;
        case 3:
          this.arrayConst = {
            nombrePiso : this.formulario.value.nombre,
            torreId: this.formulario.value.id
          };
          this.apiService.postPisos(this.arrayConst).subscribe();
        break;
        case 4:
          console.log(this.formulario.value.nombre);
          const arrayConst = {
            nombreArea : this.formulario.value.nombre,
            pisoId : this.formulario.value.id2
          };
          this.apiService.postAreas(arrayConst).subscribe();
        break;
        case 5: 
          this.arrayConst = {
            nombreCategoria : this.formulario.value.nombre,
            subNovedadId : this.formulario.value.id
          };
          this.apiService.postCategorias(this.arrayConst).subscribe();
        break;
      } // Imprime los valores del formulario en la consola
    } else {
      console.log('Formulario inválido');
    }
  }
}
