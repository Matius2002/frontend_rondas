//Importaciones
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

//Decorador @Component
@Component({ 
  selector: 'app-contenedor',
  standalone: true, 
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})

//Clase ContenedorComponent
export class ContenedorComponent {
  files: File[] = [];
  imageUrls: string[] = [];
  readonly maxFiles: number = 5;
  selectedCategory: string = '';
  selectedSubCategories: string[] = [];
  selectedSubCategoriesList: string[] = [];
  otherCategory: string = '';
  otherSubCategory: string = ''; 
  subCategoryStatus: { [key: string]: string } = {};
  priority: string = '';
  novedad = {
    descripcion: ''
  };

  constructor(private http: HttpClient) {}

  //Métodos del Componente

  //Maneja la selección de archivos, limitando el número de archivos seleccionados
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

  //Genera URLs para vistas previas de los archivos seleccionados
  updateImagePreviews(): void {
    this.imageUrls = this.files.map(file => URL.createObjectURL(file));
  }

  //Calcula el progreso de la carga de archivos como un porcentaje
  calculateProgress(): string {
    return `${(this.files.length / this.maxFiles) * 100}%`;
  }

  //Maneja el cambio de categoría, restableciendo las subcategorías y los estados cuando cambia la categoría seleccionada
  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.selectedSubCategories = [];
    this.selectedSubCategoriesList = [];
    this.subCategoryStatus = {};
    if (this.selectedCategory !== 'otros') {
      this.otherCategory = '';
    }
  }

  //Añade las subcategorías seleccionadas a la lista de subcategorías seleccionadas y establece su estado por defecto a "buen estado"
  addSelectedSubCategories(): void {
    this.selectedSubCategories.forEach(subCategory => {
      if (subCategory === 'otro') {
        if (this.otherSubCategory.trim() !== '') {
          if (!this.selectedSubCategoriesList.includes(this.otherSubCategory)) {
            this.selectedSubCategoriesList.push(this.otherSubCategory);
            this.subCategoryStatus[this.otherSubCategory] = 'buen_estado'; 
          }
        }
      } else {
        if (!this.selectedSubCategoriesList.includes(subCategory)) {
          this.selectedSubCategoriesList.push(subCategory);
          this.subCategoryStatus[subCategory] = 'buen_estado'; 
        }
      }
    });
    this.selectedSubCategories = []; 
    this.otherSubCategory = ''; 
  }
  
  //Elimina una subcategoría de la lista de subcategorías seleccionadas y borra su estado
  removeSubCategory(subCategory: string): void {
    this.selectedSubCategoriesList = this.selectedSubCategoriesList.filter(sc => sc !== subCategory);
    delete this.subCategoryStatus[subCategory];
  }

  //Devuelve una lista de subcategorías basada en la categoría seleccionada
  getSubCategories(): string[] {
    switch (this.selectedCategory) {
      case 'Hardware':
        return ['cpu', 'Monitor', 'Teclado', 'Mouse', 'Cable de red', 'Timbre de enfermeria', 'Consola de enfermeria','Televisor','Otro'];
      case 'Software':
        return ['Antivirus','Office','Windows','Carpetas Compartidas', 'Navegador', 'Otro'];
      case 'Aplicativos':
        return ['Hosvital Financiero', 'Hosvital Asistencial', 'Salomon', 'Atrys', 'Aula Virtual', 'Resultados Radiologia', 'Zimbra','Outlook','Otro'];
      case 'Impresoras':
        return ['Adf', 'Atasco', 'Bandeja', 'Toner', 'Error', 'Cristal','Otro'];
      case 'Camaras':
        return ['Fecha', 'Imagen', 'Camaras', 'Rack','Otro'];
      case 'Infoturno':
        return ['Red', 'Papel', 'Atasco', 'Registro','Software','Servidor','Otro'];
      case 'Biometrico':
        return ['Red','Desincronizacion','Registro','Almacenamiento','Otro'];
      case 'Redes':
        return ['Rack', 'Switch', 'Energia', 'Servidor', 'Fibra Optica', 'Otro'];
      default:
        return [];
    }
  }

  //Envía los datos del formulario al servidor a través de una solicitud HTTP POST. Maneja la respuesta y los errores de la solicitud
  onSubmit(): void {
    const formData = {
      category: this.selectedCategory,
      subCategories: this.selectedSubCategoriesList,
      subCategoryStatus: this.subCategoryStatus,
      priority: this.priority,
      description: this.novedad.descripcion
    };

    this.http.post('http://localhost:8080/api/novedades', formData).subscribe(
      response => {
        console.log('Registro exitoso', response);
      },
      error => {
        console.error('Error en el registro', error);
      }
    );
  }
}
