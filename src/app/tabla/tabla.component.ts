import {Component} from '@angular/core';

export interface PeriodicElement {
  id: String;
  nombre: string;
  apellidos: string;
  edad: number;
  curso:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {id: '2',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {id: '3',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {id: '4',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {id: '5',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {id: '6',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'}

];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'tabla-componente',
  styleUrls: ['tabla.component.css'],
  templateUrl: 'tabla.component.html',
})
export class TablaComponent {
  displayedColumns: string[] = ['id','nombre', 'apellidos', 'edad', 'curso','edit','delete'];
  dataSource = ELEMENT_DATA;
}