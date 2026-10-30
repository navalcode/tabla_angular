import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface Student {
  readonly id: string;
  firstName: string;
  lastName: string;
  age: number;
  course: string;
}

export function exampleStudents(): Student[] {
  return [
    { id: '1', firstName: 'Ada', lastName: 'Demo', age: 22, course: 'DAM-A' },
    {
      id: '2',
      firstName: 'Leo',
      lastName: 'Ejemplo',
      age: 24,
      course: 'DAM-A'
    },
    {
      id: '3',
      firstName: 'Inés',
      lastName: 'Prueba',
      age: 21,
      course: 'DAM-B'
    },
    { id: '4', firstName: 'Nico', lastName: 'Demo', age: 25, course: 'DAM-B' },
    {
      id: '5',
      firstName: 'Mara',
      lastName: 'Ejemplo',
      age: 23,
      course: 'DAM-A'
    },
    { id: '6', firstName: 'Teo', lastName: 'Prueba', age: 20, course: 'DAM-B' }
  ];
}

export function practiceText(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return typeof value === 'string' &&
      value.trim().length > 0 &&
      value.length <= max &&
      !/[\x00-\x1f\x7f-\x9f]/.test(value)
      ? null
      : { practiceText: true };
  };
}

export function practiceAge(control: AbstractControl): ValidationErrors | null {
  return Number.isInteger(control.value) &&
    control.value >= 0 &&
    control.value <= 120
    ? null
    : { practiceAge: true };
}
