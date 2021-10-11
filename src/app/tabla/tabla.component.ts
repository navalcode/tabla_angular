import {Component} from '@angular/core';

export interface PeriodicElement {
  nombre: string;
  apellidos: string;
  edad: number;
  curso:string;
  acciones: string;
  trash: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM',acciones:'edit',trash:'trash'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM',acciones:'edit',trash:'trash'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM',acciones:'edit',trash:'trash'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM',acciones:'edit',trash:'trash'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM',acciones:'edit',trash:'trash'},
  {nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM',acciones:'edit',trash:'trash'}

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
  displayedColumns: string[] = ['nombre', 'apellidos', 'edad', 'curso','acciones','trash'];
  dataSource = ELEMENT_DATA;
}