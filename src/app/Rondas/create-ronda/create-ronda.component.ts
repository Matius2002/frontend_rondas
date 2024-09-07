import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import {
  AngularSignaturePadModule,
  NgSignaturePadOptions,
  SignaturePadComponent
} from '@almothafar/angular-signature-pad';

/*===============IMPORTACIÓN DE MATEO MORA===============*/
import { CommonModule } from '@angular/common';
import { Sede } from '../../models/Sede';
import { Piso } from '../../models/Piso';
import { Area } from '../../models/Area';
import { Zona } from '../../models/Zona';
import { Categoria } from '../../models/Categoria';
import { RondaService } from '../../Services/create-ronda.service';


interface Marca { id: number; nombreMarca: string; enabled: boolean; }
interface Accesorios { id: number, nombreAccesorio: string; enabled: boolean; }
interface Equipo { id: number, nombreEquipo: string, idPlaca: string, idSerial: string, marca: Marca, modelo: string, categoria: Categoria, accesorios: Accesorios[], enabled: boolean }
interface Observacion { id: number; descripcion: string; registerTime: string; enabled: boolean }
interface Image { id: number; url: string; nombreImage: string; }
interface Novedad { id: number; enabled: boolean; status: number; observacionField: string; images: Image[]; equipo: Equipo; pruebaFuncionamientoCheck: number[]; listaSubCategories: any; categoria: any; prioridad: string; resuelto: boolean}
interface Ronda { id: number; horaIniciada: string; horaFinalizada: string }

@Component({
  selector: 'app-create-ronda',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    NgForOf,
    FormsModule,
    AngularSignaturePadModule,
    CommonModule
  ],
  templateUrl: './create-ronda.component.html',
  styleUrl: './create-ronda.component.css',
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
export class CreateRondaComponent implements OnInit {

  selectedFile: File | null = null;
  fileName: string | null = null;
  /*================VARIABLES DE MATEO MORA================*/
  files: File[] = [];
  imageUrls: string[] = [];
  readonly maxFiles: number = 5;
  selectedCategory: string = '';
  selectedCategoryId: number = 0;
  selectedSubCategories: string[] = [];
  selectedSubCategoriesList: string[] = [];
  generatedSubCategoriesList: string[] = [];
  otherCategory: string = '';
  otherSubCategory: string = '';
  subCategoryStatus: { [key: string]: string } = {};
  priority: string = '';
  resolved: boolean = false;
  idRonda: number = 0;
  novedad = {
    descripcion: ''
  };
  selectedOption: boolean = false;
  showOtherInput: boolean = false;
  isOtherChecked: boolean = false;
  subCategorias: any[] = [];
  selectedTipoNovedadId: any;
  /*================VARIABLES DE MATEO MORA================*/

  //*** VARIABLES CONTROL MODAL ***//
  modalServicio: boolean = true;
  modalEquipo: boolean = false;
  //*** VARIABLES CONTROL MODAL ***//

  //*** VARIABLES ARRAYS SELECT ***//
  sedes: Sede[] = [];
  selectedSede!: Sede;
  dummySede: Sede = { id: 0, nombreSede: "Seleccione la Torre", pisos: [], enabled: false };

  selectedPiso!: Piso;
  dummyPiso: Piso = { id: 0, numeroPiso: "Seleccione el Piso", areas: [], enabled: false };

  selectedArea!: Area;
  dummyArea: Area = { id: 0, nombreArea: "Seleccione el Área", zonas: [], enabled: false };

  selectedZona!: Zona;
  dummyZona: Zona = { id: 0, nombreZona: "Seleccione la Zona", enabled: false };

  tiposNovedad: any[] = [];
  tipoNovedadTecnologica: any[] =[];

  selectedTipoNovedad = 0;

  dummyCategoria: Categoria = { id: 0, nombreCategoria: "🔍 Categoría", enabled: false }
  selectedCategoria: number = this.dummyCategoria.id;
  categorias: Categoria[] =
    [
      this.dummyCategoria,
      { id: 1, nombreCategoria: "Categoría Uno", enabled: true },
      { id: 2, nombreCategoria: "Categoría Dos", enabled: true },
    ];

  dummyMarca: Marca = { id: 0, nombreMarca: "🔍 Marca", enabled: false }
  selectedMarca: number = this.dummyMarca.id;
  marcas: Marca[] =
    [
      this.dummyMarca,
      { id: 1, nombreMarca: "Marca Uno", enabled: true },
      { id: 2, nombreMarca: "Marca Dos", enabled: true },
    ];

  accesoriosUno: Accesorios[] =
    [
      { id: 1, nombreAccesorio: 'Cable', enabled: true },
      { id: 2, nombreAccesorio: 'Monitor', enabled: true },
      { id: 3, nombreAccesorio: 'Bateria', enabled: true },
      { id: 4, nombreAccesorio: 'Sensor', enabled: true },
    ]

  accesoriosDos: Accesorios[] =
    [
      { id: 1, nombreAccesorio: 'Cable', enabled: true },
      { id: 4, nombreAccesorio: 'Sensor', enabled: true },
    ]

  accesoriosTres: Accesorios[] =
    [
      { id: 1, nombreAccesorio: 'Cable', enabled: true },
      { id: 3, nombreAccesorio: 'Bateria', enabled: true },
      { id: 4, nombreAccesorio: 'Sensor', enabled: true },
    ]

  equipos: Equipo[] =
    [
      {
        id: 1,
        nombreEquipo: "Equipo Uno",
        idPlaca: "Placa Uno",
        idSerial: "Placa Uno",
        categoria: this.categorias[1],
        marca: this.marcas[1],
        modelo: "Modelo Uno",
        accesorios: this.accesoriosUno,
        enabled: true,
      },
      {
        id: 2,
        nombreEquipo: "Equipo Dos",
        idPlaca: "Placa Dos",
        idSerial: "Placa Dos",
        categoria: this.categorias[1],
        marca: this.marcas[2],
        modelo: "Modelo Dos",
        accesorios: this.accesoriosDos,
        enabled: true,
      },
      {
        id: 3,
        nombreEquipo: "Equipo Tres",
        idPlaca: "Placa Tres",
        idSerial: "Placa Tres",
        categoria: this.categorias[2],
        marca: this.marcas[1],
        modelo: "Modelo Tres",
        accesorios: this.accesoriosUno,
        enabled: true,
      },
      {
        id: 4,
        nombreEquipo: "Equipo Cuatro",
        idPlaca: "Placa Cuatro",
        idSerial: "Placa Cuatro",
        categoria: this.categorias[2],
        marca: this.marcas[2],
        modelo: "Modelo Tres",
        accesorios: this.accesoriosTres,
        enabled: true,
      },
    ]
  //*** VARIABLES ARRAYS SELECT ***//

  //*** VARIABLES ***//
  @ViewChild('signatureUno', { static: false }) signatureUno!: SignaturePadComponent;
  @ViewChild('signatureDos', { static: false }) signatureDos!: SignaturePadComponent;

  horaInicioRonda!: string;
  fechaInicioRonda!: string;

  selectedEquipo: Equipo = {
    id: 0,
    nombreEquipo: "",
    idPlaca: "",
    idSerial: "",
    categoria: this.categorias[1],
    marca: this.marcas[1],
    modelo: "",
    accesorios: this.accesoriosUno,
    enabled: true,
  };
  selectedTab: number = 1;

  observacionField: string = "";
  observaciones: Observacion[] = [];

  pruebasFuncionamientoChecks: number[] = [];

  images: Image[] = [];

  novedades: Novedad[] = [];

  listaSubCateries: string = "";

  public signaturePadOptions: NgSignaturePadOptions =
    {
      minWidth: 1,
      canvasWidth: 700,
      canvasHeight: 400,
      penColor: 'black',
      backgroundColor: '#ffffff',
      dotSize: 0.5,
      maxWidth: 1,
      velocityFilterWeight: 1
    };

  firmaUno: string = "";
  firmaDos: string = "";

  linkFirmaUno: string = "";
  linkFirmaDos: string = "";

  torres: any[] = [];
  pisos: any[] = [];
  areas: any[] = [];

  //*** VARIABLES ***//

  constructor(private router: Router, private apiService: RondaService ) {
    this.getScreenSize();
  }

  ngOnInit() { 

    this.apiService.getTorres().subscribe(resdata => {
      this.torres = resdata;
    })

    this.horaInicioRonda = this.getCurrentTime();
    this.fechaInicioRonda = this.getCurrentDate();

    this.apiService.getTipoNovedad().subscribe(resdata =>{
      this.tiposNovedad = resdata;
      console.log(this.tiposNovedad)
    })
  }


  changeTorre() {
    this.apiService.getPisos(this.selectedSede).subscribe(resdata => {
      this.pisos = resdata;
    })
  }

  changePiso() { 
    this.apiService.getAreas(this.selectedPiso).subscribe(resdata => {
      this.areas = resdata;
    })
  }

  changeArea() { this.selectedZona = this.selectedArea.zonas[0]; }

  navigateBackToMain() { this.router.navigate(['/rondas']) }

  modalServicioControl(value: any) { 
    this.modalServicio = value; 
    const ronda = {
      "torre":this.selectedSede,
      "piso":this.selectedPiso,
      "area":this.selectedArea,
      "tecnicoResponsable": localStorage.getItem('username')
    }

    this.apiService.postRondas(ronda).subscribe(resdata =>{
      this.idRonda = resdata;
    });
     
    this.apiService.getSubNovedad(3).subscribe(resdata => {
      this.tipoNovedadTecnologica = resdata;
      console.log(this.tipoNovedadTecnologica);
    })
       
  }

  modalSelectEquipoControl(value: boolean, number: number) {
    this.modalEquipo = value;

    if (number == 2 ) {
      if (this.selectedEquipo.id == 0) { this.selectedEquipo = { id: 0, nombreEquipo: "Equipo Uno", idPlaca: "Placa Uno", idSerial: "Placa Uno", categoria: this.categorias[1], marca: this.marcas[1], modelo: "Modelo Uno", accesorios: this.accesoriosUno, enabled: true, }; }
    }
  }

  selectEquipo(equipo: Equipo) {
    this.selectedEquipo = equipo;

    this.pruebasFuncionamientoChecks = [];
    this.observaciones = [];
    this.images = [];

    for (let pruebas of this.selectedEquipo.accesorios) { this.pruebasFuncionamientoChecks.push(0); }

    console.log(this.pruebasFuncionamientoChecks);
  }

  changeTab(tab: number) {
    this.selectedTab = tab
    if (this.linkFirmaUno == "") { this.clearUsuarioRondas(); }
    if (this.linkFirmaDos == "") { this.clearResponsable(); }
  }

  addObservaciones() {
    const observacion: Observacion = { id: this.observaciones.length + 1, descripcion: this.observacionField, enabled: true, registerTime: this.getCurrentTime() }
    this.observaciones.push(observacion);
    this.observacionField = "";
  }

  deleteObservacion(i: number) { this.observaciones.splice(i, 1) }

  changeResultadoPruebaFuncionamiento(index: number, resultado: number) { this.pruebasFuncionamientoChecks[index] = resultado; }

  getCurrentTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // Para formato de 12 horas con AM/PM
      timeZone: 'America/Bogota' // Zona horaria de Bogotá
    };
    return now.toLocaleTimeString('en-US', options);
  }  

  getCurrentDate(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit', // Usa '2-digit' para obtener el mes con dos dígitos (ej. 08 para agosto)
      day: '2-digit', // Usa '2-digit' para obtener el día con dos dígitos (ej. 05 para el quinto día)
      timeZone: 'America/Bogota'
    };
    return now.toLocaleDateString('en-US', options);
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    const maxSize: number = 5 * 1024 * 1024; // 5 MB Limit

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        this.selectedFile = file;
        this.fileName = file.name; // Extrae solo el nombre del archivo
      } else {
        this.fileName = null;
      }
      if (file.type.match(/image\/*/) == null) {
        console.error('Only images are allowed.');
        continue;
      }

      if (file.size > maxSize) {
        console.error('File size exceeds 5 MB.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img: Image = { id: this.images.length + 1, url: e.target.result, nombreImage: file.name }
        this.images.push(img);
      };
      reader.readAsDataURL(file);

      console.log(this.images)
    }
  }

  deleteImage(index: number) {
    this.images.splice(index, 1)
  }

  addNovedad() {

    const novedad: Novedad = {
      id: this.novedades.length + 1,
      images: this.images,
      equipo: this.selectedEquipo,
      enabled: true,
      observacionField: this.novedad.descripcion,
      pruebaFuncionamientoCheck: this.pruebasFuncionamientoChecks,
      status: 0,
      listaSubCategories: this.generatedSubCategoriesList,
      categoria: '"'+(this.selectedCategory)+'"',
      prioridad: this.priority,
      resuelto: this.selectedOption
    }

    const nove = {
      rondaId: this.idRonda,
      prioridad: this.priority,
      tipoNovedadId: this.selectedTipoNovedad,
      img:this.fileName,
      observacion: this.novedad.descripcion,
      categorias:  JSON.stringify(Object.entries(this.subCategoryStatus)) || this.otherCategory,
      categoriaId: this.selectedCategory || 9,
      resuelto: this.selectedOption,
      horaRonda: this.horaInicioRonda,
      fechaRonda: this.fechaInicioRonda
    }

    console.log("Arreglo novedad: ",novedad);
    console.log("Que hay en el arreglo de novedades: ",this.novedades);
    
    

    this.images = [];
    this.observaciones = [];
    this.observacionField = "";
    this.pruebasFuncionamientoChecks = [];
    this.subCategorias = [];
    this.generatedSubCategoriesList = [];
    this.novedades.push(novedad);
    this.selectedTab = 2;
    this.novedad.descripcion = ""

    this.apiService.postNovedades(nove).subscribe();
    
  }

  toStringLiteral(obj: { [key: string]: string }): string {
    const entries = Object.entries(obj);
    const formattedEntries = entries.map(([key, value]) => `${key}: "${value}"`);
    return `{${formattedEntries.join(', ')}}`;
  }

  checkAddEnabled() {
    if (this.selectedEquipo.id === 0) { return true; }
    return this.pruebasFuncionamientoChecks.includes(0);
  }

  checkIfAlreadyRegistered(equipo: Equipo) { return this.novedades.some(novedad => novedad.equipo.id === equipo.id); }

  clearUsuarioRondas() { this.firmaUno = ""; this.linkFirmaUno = ""; this.signatureUno.clear(); }

  clearResponsable() { this.firmaDos = ""; this.linkFirmaDos = ""; this.signatureDos.clear(); }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    const screenWidth: number = window.innerWidth;
    const screenHeight: number = window.innerHeight;
    console.log("Width: " + screenWidth + ", Height: " + screenHeight);
  }

  drawComplete(event: MouseEvent | Touch) {
    // Will be notified of szimek/signature_pad's onEnd event
    console.log("Completed Firma", event);
    this.firmaUno = this.signatureUno.toDataURL();
    console.log(this.firmaDos);
  }

  drawCompleteDos(event: MouseEvent | Touch) {
    // Will be notified of szimek/signature_pad's onEnd event
    console.log('Completed firma', event);
    this.firmaDos = this.signatureDos.toDataURL();
    console.log(this.firmaDos)
  }

  saveFirmaUsuarioRondas() { this.linkFirmaUno = this.firmaUno; }
  saveFirmaResponsable() { this.linkFirmaDos = this.firmaDos; }


  setOption(option: boolean): void {
    this.selectedOption = option;
  }

  updateFileCount(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = Array.from(element.files ?? []);
    if (files.length > this.maxFiles) {
      alert(`Solo puede seleccionar un máximo de ${this.maxFiles} imágenes.`);
      element.value = '';
      this.files = [];
      this.imageUrls = [];
    } else {
      this.files = files;
      this.updateImagePreviews();
    }
  }

  updateImagePreviews(): void {
    this.imageUrls = this.files.map(file => URL.createObjectURL(file));
  }

  calculateProgress(): string {
    return `${(this.files.length / this.maxFiles) * 100}%`;
  }

  onCategoryChange(value: number) {

    this.selectedSubCategories = [];
    this.selectedSubCategoriesList = [];
    this.generatedSubCategoriesList = []; // Limpiar la lista generada al cambiar la categoría
    this.subCategoryStatus = {};
    this.showOtherInput = false; // Resetear la visibilidad del input "Otro"
    this.isOtherChecked = false; // Resetear el estado del checkbox "Otro"

    // Asigna el valor a selectedCategory
    this.selectedCategoryId = value;


    if (this.selectedCategory !== 'otros') {
      this.otherCategory = ''; // Limpiar el valor de la novedad "otros"
    }

    if (this.selectedCategory === 'otros') {
      // Limpiar las subcategorías si la opción es 'otros'
      this.subCategorias = [];
    } else {
      this.loadSubCategories(this.selectedCategoryId);
    }

    // Limpiar las subcategorías seleccionadas si la categoría cambia
    this.selectedSubCategories = [];
  }

  onPriorityChange(event: any): void {
    this.priority = event.target.value;
  }

  // Nuevo método para manejar el cambio de los checkboxes
  onCheckboxChange(event: Event): void {
    console.log(event);
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.value === 'Otro') {
      this.showOtherInput = checkbox.checked;
      this.isOtherChecked = checkbox.checked; // Actualiza el estado de "Otro"

      if (checkbox.checked) {
        // Desmarcar todos los otros checkboxes
        this.selectedSubCategories = [];
        const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
        checkboxes.forEach(cb => {
          if ((cb as HTMLInputElement).value !== 'Otro') {
            (cb as HTMLInputElement).checked = false;
          }
        });
      }
    } else {
      if (checkbox.checked) {
        this.selectedSubCategories.push(checkbox.value);
        // Desmarcar el checkbox de "Otro"
        this.isOtherChecked = false;
        this.showOtherInput = false;
        const otherCheckbox = document.querySelector(`input[type="checkbox"][value="Otro"]`) as HTMLInputElement;
        if (otherCheckbox) {
          otherCheckbox.checked = false;
        }
      } else {
        this.selectedSubCategories = this.selectedSubCategories.filter(subCategory => subCategory !== checkbox.value);
      }
    }
  }

  addSelectedSubCategories(): void {
    this.selectedSubCategories.forEach(subCategory => {
      if (subCategory === 'Otro' && this.otherSubCategory.trim() !== '') {
        if (!this.selectedSubCategoriesList.includes(this.otherSubCategory)) {
          this.selectedSubCategoriesList.push(this.otherSubCategory);
          this.subCategoryStatus[this.otherSubCategory] = 'Funcional';
        }
      } else if (subCategory !== 'Otro') {
        if (!this.selectedSubCategoriesList.includes(subCategory)) {
          this.selectedSubCategoriesList.push(subCategory);
          this.subCategoryStatus[subCategory] = 'Funcional';
        }
      }
    });
    this.selectedSubCategories = [];
    this.otherSubCategory = '';
    this.showOtherInput = false; // Ocultar el input "Otro" después de añadir la subcategoría
  }

  // Nuevo método para generar la lista de subcategorías seleccionadas
  generateSelectedSubCategories(): void {
    if (this.otherSubCategory.trim() === '') { // Verifica si el input está vacío
      this.generatedSubCategoriesList = this.selectedSubCategories.filter(subCategory => subCategory !== 'Otro');
    } else {
      // Limpia la lista generada si hay texto en el input
      this.generatedSubCategoriesList = [];
    }

    if (this.otherSubCategory.trim() !== '') {
      this.generatedSubCategoriesList.push(this.otherSubCategory);
    }
  }

  // Método para eliminar una subcategoría de la lista generada y desmarcar el checkbox correspondiente
  removeGeneratedSubCategory(subCategory: string): void {
    this.generatedSubCategoriesList = this.generatedSubCategoriesList.filter(sc => sc !== subCategory);
    this.selectedSubCategories = this.selectedSubCategories.filter(sc => sc !== subCategory);
    delete this.subCategoryStatus[subCategory];

    // Desmarcar el checkbox correspondiente
    const checkbox = document.querySelector(`input[type="checkbox"][value="${subCategory}"]`) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  }

  // Método para manejar la eliminación de una subcategoría de la lista generada
  removeSubCategory(subCategory: string): void {
    this.selectedSubCategoriesList = this.selectedSubCategoriesList.filter(sc => sc !== subCategory);
    delete this.subCategoryStatus[subCategory];
  }

  // Lista de opciones para el select
  getOptions(): string[] {
    return ['Opción 1', 'Opción 2', 'Opción 3'];
  }

  // Método para manejar la eliminación de la novedad
  removeNovedad(): void {
    // Implementa la lógica para eliminar la novedad
    console.log('Novedad eliminada');
  }

  loadSubCategories(categoryId: number) {
    console.log('Categoria', categoryId);
    this.apiService.getCategorias(categoryId).subscribe(
      (resdata: number[]) => {
        this.subCategorias = resdata;
      },
      error => {
        console.error('Error al cargar las subcategorías', error);
        this.subCategorias = [];  // Manejo del error: limpiar las subcategorías en caso de error
      }
    );
  }

  getSubCategories(): any[] {
    return this.subCategorias;
  }

  onSubmit(): void {
    const formData = {
      prioridad: this.priority,
      tipoNovedad: this.selectedTipoNovedad,
      images:this.images,
      observacion: this.novedad.descripcion,
      categorias: this.selectedCategory,
      subCategorias: this.subCategoryStatus
    };
    const ronda = {
      tipoNovedad: this.selectedTipoNovedad,
      sede:this.selectedSede,
      piso:this.selectedPiso,
      area:this.selectedArea,
      tecnicoResponsable: localStorage.getItem('username')
    }
    console.log(formData);
  }

  /*================FIN DE MATEO MORA================*/
}