import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  title = 'file-management';

  formulario: boolean = false;

  cambiarFormulario(value: boolean) {
    this.formulario = value;
  }

  constructor(){
    this.ordenar();
  }

  cargarFile(value: FileItem){
    this.formulario = false;
    this.files.push(value);
    this.ordenar();
  }

  ordenar(){
    this.files.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;

      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;

      return 0;
    });
  }
}
