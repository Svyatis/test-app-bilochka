import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './app.material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ScrollDirective } from './shared/directives/scroll.directive';
import { LoadingWheelComponent } from './shared/components/loading-wheel/loading-wheel.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoadingWheelComponent,
        ScrollDirective
    ],
    exports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        ScrollDirective,
        LoadingWheelComponent
    ]
})
export class SharedModule { }
