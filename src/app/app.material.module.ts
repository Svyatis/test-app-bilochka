import { NgModule } from '@angular/core';
import {
         MatButtonModule,
         MatIconModule,
         MatTableModule,
         MatFormFieldModule,
         MatInputModule
        } from '@angular/material';

@NgModule({
    imports: [
              MatButtonModule,
              MatIconModule,
              MatTableModule,
              MatFormFieldModule,
              MatInputModule
            ],
    exports: [
              MatButtonModule,
              MatIconModule,
              MatTableModule,
              MatFormFieldModule,
              MatInputModule
            ]
})
export class MaterialModule { }
