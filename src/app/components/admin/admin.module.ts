import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNutsComponent } from './nuts/nuts.component';
import { AdminFruitsComponent } from './fruits/fruits.component';
import { AdminGiftsComponent } from './gifts/gifts.component';
import { AdminMixesComponent } from './mixes/mixes.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNutsComponent,
    AdminFruitsComponent,
    AdminGiftsComponent,
    AdminMixesComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
