import { NgModule } from '@angular/core';
import {
         MatButtonModule,
         MatIconModule,
         MatTableModule,
         MatFormFieldModule,
         MatInputModule,
         MatPaginatorModule,
         MatSortModule,
         MatDialogModule,
         MatSelectModule
        } from '@angular/material';

@NgModule({
    imports: [
              MatButtonModule,
              MatIconModule,
              MatTableModule,
              MatFormFieldModule,
              MatInputModule,
              MatPaginatorModule,
              MatSortModule,
              MatDialogModule,
              MatSelectModule
            ],
    exports: [
              MatButtonModule,
              MatIconModule,
              MatTableModule,
              MatFormFieldModule,
              MatInputModule,
              MatPaginatorModule,
              MatSortModule,
              MatDialogModule,
              MatSelectModule
            ]
})
export class MaterialModule { }
