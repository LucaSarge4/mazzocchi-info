import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }