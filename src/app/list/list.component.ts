import { Component, EventEmitter, Output } from '@angular/core';
import { FileItem } from '../../models/file.item.model';
import { FILE_LIST } from '../../data/file.storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Output() verFormulario = new EventEmitter<boolean>();

  files: FileItem[] = [];
  seleccionados: number[] = [];

  constructor() {
    this.files = FILE_LIST;
  }

  mostrarFormulario() {
    this.verFormulario.emit(true);
  }


  toggleSeleccion(index: number) {
    const seleccionIndex = this.seleccionados.indexOf(index);
    if (seleccionIndex === -1) {
      this.seleccionados.push(index);
    } else {
      this.seleccionados.splice(seleccionIndex, 1);
    }
  }

  borrarArchivos() {
    if (this.seleccionados.length === 0) {
      alert('No has seleccionado ningún archivo.');
      return;
    }

    if (this.seleccionados.length === 1) {
      this.confirmarBorrado();
    } else {
      const confirmacion = confirm(`¿Estás seguro de que deseas borrar ${this.seleccionados.length} archivos?`);
      if (confirmacion) {
        this.confirmarBorrado();
      }
    }
  }

  confirmarBorrado() {
    this.seleccionados.sort((a, b) => b - a);
    this.seleccionados.forEach(index => {
      this.files.splice(index, 1);
    });

    this.seleccionados = [];

    alert('Archivos borrados con éxito');
  }
}
