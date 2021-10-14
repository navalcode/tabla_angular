import {Component, NgModule} from '@angular/core';

export interface alumno {
  id: String;
  nombre: string;
  apellidos: string;
  edad: number;
  curso:string;
}


const ELEMENT_DATA: alumno[] = [
  {id: '1',nombre: 'Pedro', apellidos: 'Gomara Lopez', edad: 22, curso: '2º DAM'},
  {id: '2',nombre: 'Jose', apellidos: 'Ortega y Gassete', edad: 21, curso: '2º DAM'},
  {id: '3',nombre: 'Ainara', apellidos: 'De los rios vazquez', edad: 22, curso: '2º DAM'},
  {id: '4',nombre: 'Mateo', apellidos: 'Gillen Gillen', edad: 25, curso: '2º DAM'},
  {id: '5',nombre: 'Alejandro', apellidos: 'Castro Polanco', edad: 21, curso: '2º DAM'},
  {id: '6',nombre: 'Julia', apellidos: 'Vazquez Gons', edad: 21, curso: '2º DAM'}

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

  idChecked:boolean = true;
  nombreChecked:boolean= true;
  apellidosChecked:boolean= true;
  cursoChecked:boolean= true;
  edadChecked:boolean= true;
  editarChecked:boolean= true;
  deleteChecked:boolean= true;





}
