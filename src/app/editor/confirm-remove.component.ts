import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { I18nService } from '../i18n.service';
import { Student } from '../student';

@Component({
  selector: 'app-confirm-remove',
  template: `
    <div class="dialog-heading">
      <h2 mat-dialog-title>{{ i18n.t('deleteTitle') }}</h2>
      <app-language-switch></app-language-switch>
    </div>
    <mat-dialog-content>
      <p>
        {{
          i18n.t('deleteBody', {
            name: student.firstName + ' ' + student.lastName
          })
        }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button
        mat-stroked-button
        type="button"
        cdkFocusInitial
        (click)="dialog.close(false)"
      >
        {{ i18n.t('cancel') }}
      </button>
      <button
        mat-flat-button
        color="primary"
        type="button"
        (click)="dialog.close(true)"
      >
        {{ i18n.t('confirmRemove') }}
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmRemoveComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public student: Student,
    public dialog: MatDialogRef<ConfirmRemoveComponent, boolean>,
    public i18n: I18nService
  ) {}
}
