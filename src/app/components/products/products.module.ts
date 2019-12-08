import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { SharedModule } from 'src/app/shared.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { NutsComponent } from './components/nuts/nuts.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { GiftsComponent } from './components/gifts/gifts.component';
import { MixesComponent } from './components/mixes/mixes.component';


@NgModule({
  declarations: [
    ProductsComponent,
    NutsComponent,
    FruitsComponent,
    GiftsComponent,
    MixesComponent
  ],
  imports: [
    NgxPaginationModule,
    SharedModule,
    ShoppingCartModule.forChild(),
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
