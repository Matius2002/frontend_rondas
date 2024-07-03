import { Component } from '@angular/core';

@Component({
  selector: 'app-vista',
  standalone: true,
  imports: [],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css'
})
export class VistaComponent {
  files: File[] = [];
  imageUrls: string[] = [];
  readonly maxFiles: number = 5; // Máximo número de archivos permitidos

  updateFileCount(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = Array.from(element.files ?? []);
    if (files.length > this.maxFiles) {
      alert(`Solo puede seleccionar un máximo de ${this.maxFiles} imágenes.`);
      element.value = ''; // Resetea el campo de archivo
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
}
