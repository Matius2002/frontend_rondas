import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { RondaService } from '../../Services/create-ronda.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";


interface Image { id: number; url: string; nombreImage: string; }
interface Observacion { id: number; descripcion: string; registerTime: string; enabled: boolean }

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
    CommonModule
  ],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css',
  animations:
  [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter',
          [style({ opacity: 0 }), stagger('20ms', animate('100ms ease-out', style({ opacity: 1 })))],
          { optional: true }
        )
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), animate('100ms ease-out', style({ opacity: 1 }))]
      ),
      transition(':leave', [
        style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]
      )
    ]),
    trigger('fadeAnimationBlack', [
      transition(':enter', [
        style({ opacity: 0 }), animate('100ms ease-out', style({ opacity: 0.6 }))]
      ),
      transition(':leave', [
        style({ opacity: 0.6 }), animate('100ms ease-out', style({ opacity: 0 }))]
      )
    ])
  ]
})
export class NovedadesComponent implements OnInit {
  id: number | null = null;
  novedades: any[] = [];
  selectedTab: number = 1;
  priority: string = '';
  subCategoryStatus: { [key: string]: string } = {};
  fileName: string | null = null;
  images: Image[] = [];
  selectedTipoNovedad = 0;
  idRonda: number = 0;
  observaciones: Observacion[] = [];
  observacionField: string = "";
  pruebasFuncionamientoChecks: number[] = [];
  subCategorias: any[] = [];
  generatedSubCategoriesList: any[] =[];
  categories: { [key: string]: string }[] = [];
  resolved: boolean = false;
  fecha: Date | undefined;

  constructor(private route: ActivatedRoute, private apiService: RondaService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
    })
    console.log(this.id)
    this.apiService.getNovedades(this.id).subscribe(resdata => {
      this.novedades = resdata;
      console.log('Novedades:', this.novedades);
      // Procesa cada objeto en el array novedades
      this.categories = this.novedades.map(novedad => {
        // Convierte el string JSON de categorias en un array
        const categoriasArray: [string, string][] = JSON.parse(novedad.categorias || '[]');
        
        // Transforma el array en un objeto clave-valor
        return categoriasArray.reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as { [key: string]: string });
      });
    })
  }
  

  changeTab(tab: number) {
    this.selectedTab = tab
  }

  addNovedad() {


    const nove = {
      rondaId: this.idRonda,
      prioridad: this.priority,
      tipoNovedadId: this.selectedTipoNovedad,
      img:this.fileName,
      categorias:  Object.keys(this.subCategoryStatus),
      resuelto: this.resolved,
      fechaRonda: this.fecha
    }

    this.images = [];
    this.observaciones = [];
    this.observacionField = "";
    this.pruebasFuncionamientoChecks = [];
    this.subCategorias = [];
    this.generatedSubCategoriesList = [];
    this.selectedTab = 2;

    this.apiService.postNovedades(nove).subscribe();
    
  }
}
