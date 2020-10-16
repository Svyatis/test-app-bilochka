import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import { ProductsBaseComponent } from './shared/components/products-base/products-base.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component';
import { AdminBaseComponent } from './shared/components/admin-base/admin-base.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsCartItem } from './shared/entities/product-cart-item';
import { ImagePreviewDialogComponent } from './shared/components/image-preview-dialog/image-preview-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ImagePreviewDialogComponent,
    AboutUsComponent,
    ContactsComponent,
    HomeComponent,
    AdminBaseComponent,
    ProductsBaseComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      enableHtml: true,
      progressBar: true
    }),
    ShoppingCartModule.forRoot({
      itemType: ProductsCartItem,
      serviceType: 'localStorage',
      serviceOptions: { storageKey: 'productsCart', clearOnError: true },
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDUKDol3iNUR3qWH9vZQ5T-bJTDW5u3EOg'
    }),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  entryComponents: [ImagePreviewDialogComponent],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
