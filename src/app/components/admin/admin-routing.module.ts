import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminNutsComponent } from './nuts/nuts.component';
import { AdminFruitsComponent } from './fruits/fruits.component';
import { AdminGiftsComponent } from './gifts/gifts.component';
import { AdminMixesComponent } from './mixes/mixes.component';
import { AdminOrdersComponent } from './orders/orders.component';

const childRoutes: Routes = [
  { path: 'nuts', component: AdminNutsComponent },
  { path: 'fruits', component: AdminFruitsComponent },
  { path: 'gifts', component: AdminGiftsComponent },
  { path: 'mixes', component: AdminMixesComponent },
  { path: 'orders', component: AdminOrdersComponent },
  { path: '', redirectTo: 'nuts', pathMatch: 'full' },
  { path: '**', redirectTo: 'nuts' }
];

const routes: Routes = [
  { path: '', component: AdminComponent, children: childRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
