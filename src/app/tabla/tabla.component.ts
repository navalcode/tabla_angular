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

saveformId(){
  let indice =this.displayedColumns.indexOf('id');
  if(this.idChecked){
    this.displayedColumns.splice(indice,1);
    this.idChecked=false;

  }else{
    this.displayedColumns.splice(0,0,'id')
    this.idChecked=true;
  }

}
saveformNombre(){
  let indice =this.displayedColumns.indexOf('nombre');
  if(this.nombreChecked){

    this.displayedColumns.splice(indice,1);
    this.nombreChecked=false;

  }else{
    this.displayedColumns.splice(1,0,'nombre')
    this.nombreChecked=true;
  }
}

saveformApellidos(){
  let indice =this.displayedColumns.indexOf('apellidos');
  if(this.apellidosChecked){

    this.displayedColumns.splice(indice,1);
    this.apellidosChecked=false;

  }else{
    this.displayedColumns.splice(2,0,'apellidos')
    this.apellidosChecked=true;
  }
}

saveformCurso(){
  let indice =this.displayedColumns.indexOf('curso');
  if(this.cursoChecked){

    this.displayedColumns.splice(indice,1);
    this.cursoChecked=false;

  }else{
    this.displayedColumns.splice(3,0,'curso')
    this.cursoChecked=true;
  }
}

saveformEdad(){
  let indice =this.displayedColumns.indexOf('edad');
  if(this.edadChecked){

    this.displayedColumns.splice(indice,1);
    this.edadChecked=false;

  }else{
    this.displayedColumns.splice(4,0,'edad')
    this.edadChecked=true;
  }
}
saveformEditar(){
  let indice =this.displayedColumns.indexOf('edit');
  if(this.editarChecked){

    this.displayedColumns.splice(indice,1);
    this.editarChecked=false;

  }else{
    this.displayedColumns.splice(5,0,'edit')
    this.editarChecked=true;
  }
}

saveformDelete(){
  let indice =this.displayedColumns.indexOf('delete');
  if(this.deleteChecked){

    this.displayedColumns.splice(indice,1);
    this.deleteChecked=false;

  }else{
    this.displayedColumns.splice(6,0,'delete')
    this.deleteChecked=true;
  }
}

}
