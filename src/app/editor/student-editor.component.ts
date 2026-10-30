import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CopyKey, I18nService } from '../i18n.service';
import { practiceAge, practiceText, Student } from '../student';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html'
})
export class StudentEditorComponent {
  @ViewChild('errorSummary') errorSummary?: ElementRef<HTMLElement>;
  @ViewChild('editor') editor?: ElementRef<HTMLFormElement>;
  readonly fields: Array<'firstName' | 'lastName' | 'age' | 'course'> = [
    'firstName',
    'lastName',
    'age',
    'course'
  ];
  readonly form: FormGroup;
  submitted = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public student: Student,
    private dialog: MatDialogRef<StudentEditorComponent, Student>,
    public i18n: I18nService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(student.firstName, practiceText(80)),
      lastName: new FormControl(student.lastName, practiceText(80)),
      age: new FormControl(student.age, practiceAge),
      course: new FormControl(student.course, practiceText(40))
    });
  }
  invalid(field: string): boolean {
    const control = this.form.controls[field];
    return control.invalid && (this.submitted || control.touched);
  }
  errorKey(field: string): CopyKey {
    return field === 'age'
      ? 'ageError'
      : field === 'course'
        ? 'courseError'
        : 'nameError';
  }
  focus(field: string): void {
    this.editor?.nativeElement
      .querySelector<HTMLInputElement>('#edit-' + field)
      ?.focus();
  }
  cancel(): void {
    this.dialog.close();
  }
  save(): void {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      setTimeout(() => this.errorSummary?.nativeElement.focus());
      return;
    }
    const value = this.form.value;
    this.dialog.close({
      id: this.student.id,
      firstName: value.firstName.trim(),
      lastName: value.lastName.trim(),
      age: value.age,
      course: value.course.trim()
    });
  }
}
