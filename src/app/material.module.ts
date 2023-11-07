import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }