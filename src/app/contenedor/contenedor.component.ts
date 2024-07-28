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
  generatedSubCategoriesList: string[] = []; // Nueva propiedad para almacenar las subcategorías generadas
  otherCategory: string = ''; // Nueva propiedad para almacenar la novedad de "otros"
  otherSubCategory: string = ''; 
  subCategoryStatus: { [key: string]: string } = {};
  priority: string = ''; // Propiedad independiente para la prioridad
  novedad = {
    descripcion: ''
  };
  selectedOption: string | null = null; // Estado para la opción seleccionada
  showOtherInput: boolean = false; // Propiedad para controlar la visibilidad del input "Otro"
  isOtherChecked: boolean = false; // Propiedad para controlar si el checkbox de "Otro" está seleccionado

  constructor(private http: HttpClient) {}

  setOption(option: string): void {
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

  onCategoryChange(event: any): void {
    this.selectedCategory = event.target.value;
    this.selectedSubCategories = [];
    this.selectedSubCategoriesList = [];
    this.generatedSubCategoriesList = []; // Limpiar la lista generada al cambiar la categoría
    this.subCategoryStatus = {};
    this.showOtherInput = false; // Resetear la visibilidad del input "Otro"
    this.isOtherChecked = false; // Resetear el estado del checkbox "Otro"
    if (this.selectedCategory !== 'otros') {
      this.otherCategory = ''; // Limpiar el valor de la novedad "otros"
    }
  }

  onPriorityChange(event: any): void {
    this.priority = event.target.value;
  }

  // Nuevo método para manejar el cambio de los checkboxes
  onCheckboxChange(event: Event): void {
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
          this.subCategoryStatus[this.otherSubCategory] = 'buen_estado'; 
        }
      } else if (subCategory !== 'Otro') {
        if (!this.selectedSubCategoriesList.includes(subCategory)) {
          this.selectedSubCategoriesList.push(subCategory);
          this.subCategoryStatus[subCategory] = 'buen_estado'; 
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

  getSubCategories(): string[] {
    switch (this.selectedCategory) {
      case 'Hardware':
        return ['cpu', 'Monitor', 'Teclado', 'Mouse', 'Cable de red', 'Timbre de enfermeria', 'Consola de enfermeria','Televisor','Otro'];
      case 'Software':
        return ['Antivirus','Office','Windows','Carpetas Compartidas', 'Navegador','Otro'];
      case 'Aplicativos':
        return ['Hosvital Financiero', 'Hosvital Asistencial', 'Salomon', 'Atrys', 'Aula Virtual', 'Resultados Radiologia', 'Zimbra','Outlook','Otro'];
      case 'Impresoras':
        return ['Adf', 'Atasco', 'Bandeja', 'Toner', 'Error', 'Cristal','Otro'];
      case 'Camaras':
        return ['Fecha', 'Imagen', 'Camaras', 'Rack','Almacenamiento','Otro'];
      case 'Infoturno':
        return ['Red', 'Papel', 'Atasco', 'Registro','Software','Servidor','Otro'];
      case 'Biometrico':
        return ['Red','Desincronizacion','Registro','Almacenamiento','Otro'];
      case 'Redes':
        return ['Rack', 'Switch', 'Energia', 'Servidor', 'Fibra Optica','Conexiones','Otro'];
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