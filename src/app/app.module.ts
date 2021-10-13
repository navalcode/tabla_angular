import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablaComponent } from './tabla/tabla.component';
import {CdkTableModule} from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table' 
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { DeleteButton } from './button-delete/delete.button';
import {MatButtonModule} from '@angular/material/button';
import { EditButton } from './button-edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    DeleteButton,
    EditButton
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MatTableModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
