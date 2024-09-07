import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Asegúrate de importar CommonModule
import { SearchRondaService } from '../../Services/search-ronda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-rondas',
  standalone: true,
  imports: [CommonModule], // Importar módulos necesarios
  templateUrl: './search-rondas.component.html',
  styleUrls: ['./search-rondas.component.css'],
})
export class SearchRondasComponent implements OnInit {
  dataSource: any[] = [];
  id: number = 0;

  constructor(private apiService: SearchRondaService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.apiService.getRonda().subscribe(resdata => {
      this.dataSource = resdata;
      console.log("Datos resividos del servidor: ",this.dataSource);
    });
  }

  onClickNovedad(id: any) {
    this.router.navigate(['rondas/novedades', id])
  }

  onClickEliminar(id: any) {
    const confirmacion = confirm('¿Realmente quiere eliminar la ronda?');
    if (confirmacion) {
      this.apiService.deleteRonda(id).subscribe({
        next: (response) => {
          console.log('Ronda eliminada con éxito', response);
          window.location.reload();
        },
        error: (err) => {
          console.error('Error al eliminar la ronda', err);
        }
      });
    }
  }
}