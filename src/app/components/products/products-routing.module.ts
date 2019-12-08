import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { NutsComponent } from './components/nuts/nuts.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { GiftsComponent } from './components/gifts/gifts.component';
import { MixesComponent } from './components/mixes/mixes.component';

const childRoutes: Routes = [
  { path: 'nuts', component: NutsComponent },
  { path: 'fruits', component: FruitsComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: 'mixes', component: MixesComponent },
  { path: '', redirectTo: 'nuts', pathMatch: 'full' },
  { path: '**', redirectTo: 'nuts' }
];

const routes: Routes = [
  { path: '', component: ProductsComponent, children: childRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
