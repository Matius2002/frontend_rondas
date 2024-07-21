import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contenedor',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.css']
})
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

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.selectedSubCategories = [];
    this.selectedSubCategoriesList = [];
    this.subCategoryStatus = {};
    if (this.selectedCategory !== 'otros') {
      this.otherCategory = '';
    }
  }

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
    this.selectedSubCategories = []; // Limpia las subcategorías seleccionadas
    this.otherSubCategory = ''; // Limpia el campo de otra subcategoría
  }
  
  removeSubCategory(subCategory: string): void {
    this.selectedSubCategoriesList = this.selectedSubCategoriesList.filter(sc => sc !== subCategory);
    delete this.subCategoryStatus[subCategory];
  }

  getSubCategories(): string[] {
    switch (this.selectedCategory) {
      case 'hardware':
        return ['cpu', 'Monitor', 'Teclado', 'Mouse', 'Cable de red', 'Timbre de enfermeria', 'Consola de enfermeria','Televisor','Otro'];
      case 'software':
        return ['Antivirus','Office','Windows','Carpetas Compartidas', 'Navegador', 'Otro'];
      case 'aplicativos':
        return ['Hosvital Financiero', 'Hosvital Asistencial', 'Salomon', 'Atrys', 'Aula Virtual', 'Resultados Radiologia', 'Zimbra','Outlook','Otro'];
      case 'impresoras':
        return ['Adf', 'Atasco', 'Bandeja', 'Toner', 'Error', 'Cristal','Otro'];
      case 'camaras':
        return ['Fecha', 'Imagen', 'Camaras', 'Rack','Otro'];
      case 'infoturno':
        return ['Red', 'Papel', 'Atasco', 'Registro','Software','Servidor','Otro'];
      case 'biometrico':
        return ['Red','Desincronizacion','Registro','Almacenamiento','Otro'];
      case 'redes':
        return ['Rack', 'Switch', 'Energia', 'Servidor', 'Fibra Optica', 'Otro'];
      default:
        return [];
    }
  }

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
