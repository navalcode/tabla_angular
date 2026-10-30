import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CopyKey, I18nService } from '../i18n.service';
import { Student, exampleStudents } from '../student';
import { StudentEditorComponent } from '../editor/student-editor.component';
import { ConfirmRemoveComponent } from '../editor/confirm-remove.component';

export const COLUMNS: Array<{ id: string; label: CopyKey; data: boolean }> = [
  { id: 'id', label: 'id', data: true },
  { id: 'nombre', label: 'firstName', data: true },
  { id: 'apellidos', label: 'lastName', data: true },
  { id: 'edad', label: 'age', data: true },
  { id: 'curso', label: 'course', data: true },
  { id: 'edit', label: 'edit', data: false },
  { id: 'delete', label: 'remove', data: false }
];

@Component({
  selector: 'tabla-componente',
  styleUrls: ['./tabla.component.css'],
  templateUrl: './tabla.component.html'
})
export class TablaComponent {
  @ViewChild('heading') heading?: ElementRef<HTMLElement>;
  readonly columns = COLUMNS;
  readonly displayedOriginalColumns = COLUMNS.map((column) => column.id);
  private visible = new Set(this.displayedOriginalColumns);
  dataSource = exampleStudents();
  notice: { key: CopyKey; values: Record<string, string | number> } | null =
    null;
  constructor(
    private dialog: MatDialog,
    public i18n: I18nService
  ) {}
  get displayedColumns(): string[] {
    return this.displayedOriginalColumns.filter((id) => this.visible.has(id));
  }
  get tableMinWidth(): number {
    const widths: Record<string, number> = {
      id: 60,
      nombre: 170,
      apellidos: 190,
      edad: 80,
      curso: 120,
      edit: 132,
      delete: 132
    };
    return this.displayedColumns.reduce((sum, id) => sum + widths[id], 0);
  }
  isVisible(id: string): boolean {
    return this.visible.has(id);
  }
  isLastDataColumn(id: string): boolean {
    return (
      this.visible.has(id) &&
      COLUMNS.some((column) => column.id === id && column.data) &&
      COLUMNS.filter((column) => column.data && this.visible.has(column.id))
        .length === 1
    );
  }
  checkboxChange(checked: boolean, id: string): void {
    if (
      !this.displayedOriginalColumns.includes(id) ||
      (!checked && this.isLastDataColumn(id))
    )
      return;
    if (checked) this.visible.add(id);
    else this.visible.delete(id);
  }
  trackById(_index: number, student: Student): string {
    return student.id;
  }
  private returnFocus(trigger?: HTMLElement): void {
    setTimeout(() =>
      (trigger?.isConnected ? trigger : this.heading?.nativeElement)?.focus()
    );
  }
  editStudent(student: Student, trigger?: HTMLElement): void {
    const ref = this.dialog.open(StudentEditorComponent, {
      data: { ...student },
      width: '600px',
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - 32px)',
      restoreFocus: false,
      panelClass: 'practice-dialog'
    });
    ref.afterClosed().subscribe((updated: Student | undefined) => {
      if (updated) this.updateStudent(updated);
      this.returnFocus(trigger);
    });
  }
  updateStudent(updated: Student): boolean {
    if (!this.dataSource.some((student) => student.id === updated.id)) {
      this.notice = { key: 'unavailable', values: {} };
      return false;
    }
    this.dataSource = this.dataSource.map((student) =>
      student.id === updated.id ? { ...updated } : student
    );
    this.notice = {
      key: 'updated',
      values: { name: updated.firstName + ' ' + updated.lastName }
    };
    return true;
  }
  confirmRemove(student: Student, trigger?: HTMLElement): void {
    const ref = this.dialog.open(ConfirmRemoveComponent, {
      data: { ...student },
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      maxHeight: 'calc(100vh - 32px)',
      restoreFocus: false,
      panelClass: 'practice-dialog'
    });
    ref.afterClosed().subscribe((confirmed: boolean | undefined) => {
      if (confirmed) this.removeStudent(student.id);
      this.returnFocus(trigger);
    });
  }
  removeStudent(id: string): boolean {
    const found = this.dataSource.find((student) => student.id === id);
    if (!found) return false;
    this.dataSource = this.dataSource.filter((student) => student.id !== id);
    this.notice = {
      key: 'removed',
      values: { name: found.firstName + ' ' + found.lastName }
    };
    return true;
  }
  restoreExamples(): void {
    this.dataSource = exampleStudents();
    this.notice = { key: 'restored', values: {} };
    this.returnFocus();
  }
}
