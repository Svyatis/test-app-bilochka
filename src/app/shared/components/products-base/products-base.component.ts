import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { ProductsCartItem } from 'src/app/shared/entities/product-cart-item';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { ImagePreviewDialogComponent } from '../image-preview-dialog/image-preview-dialog.component';

@Component({
  selector: 'app-products-base',
  templateUrl: './products-base.component.html',
  styleUrls: ['./products-base.component.css']
})
export class ProductsBaseComponent implements OnInit {

  products: ProductsCartItem[] = [];
  productsWeightOptions: ProductsCartItem[] = [];
  basePath;
  showSearch = false;
  form: FormGroup = this.fb.group({ searchValue: '' });
  tempCollection;
  config = { currentPage: 1, itemsPerPage: 8 };
  loading = true;
  onLoad() {
      this.loading = false;
  }

  constructor(private dataService: DataService, private toaster: ToastrService, public router: Router, public dialog: MatDialog,
              public route: ActivatedRoute, private fb: FormBuilder, private utilsService: UtilsService) { }

  ngOnInit() {
    this.utilsService.show();
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page;
    });
    this.dataService.getProducts(this.basePath).subscribe(products => {
      if (products) {
        Object.keys(products).map(p => products[p]).forEach((item: ProductsCartItem, i) => {
          item.identifier = Object.keys(products)[i] + '01';
          this.products[i] = new ProductsCartItem(item);
          this.setWeightOptions(item);
          this.tempCollection = [...this.products];
          this.showSearch = true;
          this.utilsService.hide();
        });
      }
    });
  }

  getItem(identifier: string) {
    const item: ProductsCartItem = this.productsWeightOptions.find(o => o.identifier === identifier);
    return item;
  }

  setWeightOptions(nut: ProductsCartItem) {
    const weights = ['01', '02', '05', '10'];
    weights.forEach((weight, i) => {
      const tempNut: ProductsCartItem = JSON.parse(JSON.stringify(nut));
      tempNut.identifier = nut.identifier.slice(0, -2) + weight;
      if (this.basePath !== '/mixes' && this.basePath !== '/gifts') {
        if (weight === '01') {
          tempNut.label += ' (100 г)';
          tempNut.weight = 100;
        } else if (weight === '02') {
          tempNut.label += ' (200 г)';
          tempNut.weight = 200;
        } else if (weight === '05') {
          tempNut.label += ' (500 г)';
          tempNut.weight = 500;
        } else {
          tempNut.label += ' (1 кг)';
          tempNut.weight = 1000;
        }
      }
      tempNut.cost *= +weight;
      this.productsWeightOptions.push(new ProductsCartItem(tempNut));
    });
  }

  setItemId(item: ProductsCartItem, weight: string) {
    item.identifier = item.identifier.slice(0, -2) + weight;
  }

  addToCart(item: ProductsCartItem) {
    const toast = this.toaster.info(item.label + ' у кошику.', 'Дякуємо!');
    if (toast) {
      toast.onTap.subscribe(() => {
        this.router.navigateByUrl('/cart');
      });
    }
  }

  get f() { return this.form.controls; }

  search(form: FormGroup) {
    this.router.navigate(['./products' + this.basePath], {
      queryParams: { key: form.value.searchValue }
    });
    const val = form.value.searchValue.toLowerCase();

    if (!val) {
      this.products = this.tempCollection;
    }

    const temp = this.tempCollection.filter(row => {
        return row.label === null ? null : row.label.toString().toLowerCase().indexOf(val) !== -1;
    });

    this.products = temp;
    this.router.navigate(['./products' + this.basePath]);
  }

  pageChange(newPage: number) {
    this.router.navigate(['./products' + this.basePath], { queryParams: { page: newPage } });
    if (window.innerWidth < 767) {
      window.scrollTo({
        top: window.innerHeight - 30
      });
    }
  }

  openDialog(name: string, image: string): void {
    const dialogRef = this.dialog.open(ImagePreviewDialogComponent, {
      width: '250px',
      data: {name, image}
    });
  }

}
