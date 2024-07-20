import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent {
  files: File[] = [];
  imageUrls: string[] = [];
  readonly maxFiles: number = 5;

  selectedCategory: string = '';
  selectedSubCategories: string[] = [];
  selectedSubCategoriesList: string[] = [];
  otherCategory: string = '';
  otherSubCategory: string = ''; // Variable para el texto de la subcategoría especificada
  subCategoryStatus: { [key: string]: string } = {};
  priority: string = '';
  novedad = {
    descripcion: ''
  };

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
    this.selectedSubCategories = []; // Reset subcategories when category changes
    if (this.selectedCategory !== 'otros') {
      this.otherCategory = '';
    }
  }

  addSelectedSubCategories(): void {
    this.selectedSubCategories.forEach(subCategory => {
      if (!this.selectedSubCategoriesList.includes(subCategory)) {
        this.selectedSubCategoriesList.push(subCategory);
        this.subCategoryStatus[subCategory] = 'buen_estado'; // Default status
      }
    });
    this.selectedSubCategories = [];
  }

  removeSubCategory(subCategory: string): void {
    this.selectedSubCategoriesList = this.selectedSubCategoriesList.filter(sc => sc !== subCategory);
    delete this.subCategoryStatus[subCategory];
  }

  getSubCategories(): string[] {
    switch (this.selectedCategory) {
      case 'hardware':
        return ['cpu', 'monitor', 'teclado', 'mouse', 'cable_red', 'otro'];
      case 'software':
        return ['archivos_temporales', 'antivirus', 'office', 'windows', 'navegador', 'carpetas_compartidas', 'otro'];
      case 'aplicativos':
        return ['hosvital_financiero', 'hosvital_asistencial', 'resultados_radiologia', 'salomon', 'atrys', 'aula_virtual', 'otro'];
      case 'habitaciones':
        return ['televisor', 'llamados_enfermeria', 'otro'];
      case 'impresoras':
        return ['stickers', 'scanner', 'vinculacion_equipo', 'conf_impresora', 'atasco', 'otro'];
      case 'correos':
        return ['zmbra', 'gmail', 'outlook', 'otro'];
      case 'camaras':
        return ['fecha_hora', 'pantalla', 'camara', 'otro'];
      case 'infoturno':
        return ['red', 'papel', 'atasco', 'otro'];
      case 'biometrico':
        return ['sin_sincronizacion', 'usuario_registrado', 'otro'];
      case 'redes':
        return ['rack', 'switch', 'cuarto_de_datos', 'servidor', 'ups', 'otro'];
      default:
        return [];
    }
  }
}