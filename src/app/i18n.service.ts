import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const EN = {
  brand: 'Angular table',
  pageTitle: 'Student table',
  skip: 'Skip to content',
  language: 'Language',
  title: 'Student table',
  intro: 'Choose which columns to show, edit a student or remove a row.',
  columns: 'Visible columns',
  columnsHelp: 'Keep at least one data column visible.',
  restore: 'Reset examples',
  id: 'ID',
  firstName: 'First name',
  lastName: 'Surname',
  age: 'Age',
  course: 'Course',
  edit: 'Edit',
  remove: 'Remove',
  tableRegion: 'Student table, scroll horizontally to see more columns',
  tableCaption:
    '{count} fictional records. Reloading or resetting discards all changes.',
  scrollHint: 'If columns do not fit, scroll the table sideways to reach them.',
  emptyTitle: 'No records in this session.',
  emptyBody: 'Reset the examples to start again with six students.',
  editTitle: 'Edit student',
  record: 'Fictional record · ID {id}',
  sessionOnly: 'Reloading the page discards these changes.',
  save: 'Save changes',
  cancel: 'Cancel',
  required: 'All fields are required. Use fictional values.',
  nameHint: 'Up to 80 characters.',
  ageHint: 'Whole number from 0 to 120.',
  courseHint: 'Up to 40 characters.',
  nameError: 'Enter a name of 1 to 80 characters on a single line.',
  ageError: 'Enter a whole number from 0 to 120.',
  courseError: 'Enter a course of 1 to 40 characters on a single line.',
  review: 'Check the highlighted fields.',
  deleteTitle: 'Remove this record?',
  deleteBody:
    '{name} will be removed from the table. Resetting the examples brings back all six students and discards any edits.',
  confirmRemove: 'Remove record',
  updated: 'Changes saved for {name}.',
  removed: '{name} removed from this session.',
  restored:
    'The six sample students have been restored. Edits have been cleared.',
  unavailable: 'This record is no longer available.',
  footer: 'Local learning exercise · Fictional data'
};
export type CopyKey = keyof typeof EN;
type Language = 'es' | 'en';
const ES: Record<CopyKey, string> = {
  brand: 'Tabla Angular',
  pageTitle: 'Tabla de alumnos',
  skip: 'Saltar al contenido',
  language: 'Idioma',
  title: 'Tabla de alumnos',
  intro: 'Elige qué columnas ver, edita un alumno o elimina una fila.',
  columns: 'Columnas visibles',
  columnsHelp: 'Mantén al menos una columna de datos visible.',
  restore: 'Restablecer ejemplos',
  id: 'ID',
  firstName: 'Nombre',
  lastName: 'Apellidos',
  age: 'Edad',
  course: 'Curso',
  edit: 'Editar',
  remove: 'Eliminar',
  tableRegion:
    'Tabla de alumnos, desplaza horizontalmente para ver más columnas',
  tableCaption:
    '{count} registros ficticios. Recargar la página o restablecer los ejemplos descarta todos los cambios.',
  scrollHint: 'Si no caben las columnas, desliza la tabla para verlas.',
  emptyTitle: 'No quedan registros en esta sesión.',
  emptyBody: 'Restablece los ejemplos para empezar de nuevo con seis alumnos.',
  editTitle: 'Editar alumno',
  record: 'Registro ficticio · ID {id}',
  sessionOnly: 'Al recargar la página se pierden estos cambios.',
  save: 'Guardar cambios',
  cancel: 'Cancelar',
  required: 'Todos los campos son obligatorios. Usa valores ficticios.',
  nameHint: 'Hasta 80 caracteres.',
  ageHint: 'Número entero entre 0 y 120.',
  courseHint: 'Hasta 40 caracteres.',
  nameError: 'Escribe un nombre de entre 1 y 80 caracteres en una sola línea.',
  ageError: 'Escribe un número entero entre 0 y 120.',
  courseError: 'Escribe un curso de entre 1 y 40 caracteres en una sola línea.',
  review: 'Revisa los campos señalados.',
  deleteTitle: '¿Eliminar este registro?',
  deleteBody:
    '{name} se eliminará de la tabla. Al restablecer los ejemplos recuperas los seis alumnos y se descartan las ediciones.',
  confirmRemove: 'Eliminar registro',
  updated: 'Cambios guardados para {name}.',
  removed: '{name} se ha eliminado de la tabla.',
  restored:
    'Se han recuperado los seis alumnos de ejemplo y descartado las ediciones.',
  unavailable: 'Este registro ya no está disponible.',
  footer: 'Práctica local · Datos ficticios'
};

@Injectable({ providedIn: 'root' })
export class I18nService {
  language: Language = 'es';
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.setLanguage('es');
  }
  setLanguage(language: Language): void {
    this.language = language;
    this.document.documentElement.lang = language;
    this.document.title = this.t('pageTitle');
  }
  t(key: CopyKey, values: Record<string, string | number> = {}): string {
    let result: string =
      (this.language === 'es' ? ES[key] : EN[key]) || EN[key];
    for (const name of Object.keys(values))
      result = result.split('{' + name + '}').join(String(values[name]));
    return result;
  }
}
