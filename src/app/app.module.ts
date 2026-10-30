import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { AppComponent } from './app.component';
import { TablaComponent } from './tabla/tabla.component';
import { EditButton } from './button-edit/edit.component';
import { DeleteButton } from './button-delete/delete.button';
import { LanguageSwitchComponent } from './language-switch.component';
import { StudentEditorComponent } from './editor/student-editor.component';
import { ConfirmRemoveComponent } from './editor/confirm-remove.component';

const reducedMotion =
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    EditButton,
    DeleteButton,
    LanguageSwitchComponent,
    StudentEditorComponent,
    ConfirmRemoveComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({ disableAnimations: reducedMotion }),
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    A11yModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
