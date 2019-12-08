import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { DatePipe } from '@angular/common';
import { ProductsCartItem } from 'src/app/shared/entities/product-cart-item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  submitted = false;
  purchaseForm: FormGroup;
  loading = false;

  constructor(public cartService: CartService<ProductsCartItem>, private dataService: DataService, private router: Router,
              private formBuilder: FormBuilder, private datePipe: DatePipe, private toastrService: ToastrService) { }

  ngOnInit() {
    if (window.innerWidth < 767) {
      window.scrollTo({
        top: window.innerHeight - 30,
        behavior: 'smooth'
      });
    }

    this.purchaseForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', [Validators.required, Validators.pattern('^[0-9\-\+]{10,15}$')]]
    });
  }

  get f() { return this.purchaseForm.controls; }

  onPurchase() {
    this.submitted = true;
    if (this.purchaseForm.invalid || this.cartService.isEmpty()) {
      return;
    }
    this.loading = true;
    const date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    const totalCost = this.cartService.totalCost();
    const items = this.cartService.getItems();
    const dataObject = { items, name: this.f.username.value, email: this.f.email.value, phone: this.f.phone.value, totalCost };
    this.dataService.saveFileData(dataObject, `/orders/${date}`).then(res => {
      this.toastrService.info('Ми Вам передзвонимо.', 'Дякуємо за замовлення!');
      this.cartService.clear();
      this.purchaseForm.reset();
      console.log(res);
      this.router.navigateByUrl('/');
    }).finally(() => {
      this.loading = false;
    });
  }
}
