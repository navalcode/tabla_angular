import {Component} from '@angular/core';

export interface PeriodicElement {
  nombre: string;
  apellidos: string;
  edad: number;
  curso:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'}

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
  displayedColumns: string[] = ['nombre', 'apellidos', 'edad', 'curso','edit','delete'];
  dataSource = ELEMENT_DATA;
}