import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { OWNERS } from '../../data/file.storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Output() enviarEmit = new EventEmitter<FileItem>();
  @Output() volverEmit = new EventEmitter<boolean>();
  @Input() listaArchivos: FileItem[] = [];

  file: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    owners: [],
    type: FileType.FILE,
    parentId: undefined
  };

  listaOwners: FileOwner[] = OWNERS;
  listaFileTypes: string[] = ['Carpeta', 'Archivo'];

  ownerSeleccionado: string = '';

  agregarOwner() {
    let owner = this.listaOwners.filter(owner => this.ownerSeleccionado == owner.name)[0];
    if(!this.file.owners.includes(owner)) this.file.owners.push(owner)
  }

  eliminarOwner(index: number) {
    let owner = this.listaOwners.filter(owner => this.ownerSeleccionado == owner.name)[0];
    if(this.file.owners.includes(owner)) this.file.owners.splice(index, 1)
  }

  sendForm(form: NgForm) {
    if(form.valid){
      this.enviarEmit.emit(this.file);
      console.log(this.file);



      this.file = {
        id: '',
        name: '',
        creation: new Date(),
        owners: [],
        type: FileType.FILE,
        parentId: undefined
      };
      this.ownerSeleccionado = '';
    }
  }

  volver() {
    this.volverEmit.emit(false);
  }
}
