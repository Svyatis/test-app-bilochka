import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup,  FormBuilder,  Validators, FormArray, AbstractControl } from '@angular/forms';


import { DataService } from '../../../shared/services/data.service';
import { Upload } from '../../../shared/entities/upload';
import { ToastrService } from 'ngx-toastr';
import { ProductsCartItem } from '../../entities/product-cart-item';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.css']
})
export class AdminBaseComponent implements OnInit {

  productsTable;
  productsForm: FormGroup;
  selectedFiles: FileList;
  currentUpload: Upload;
  protected basePath;
  displayedColumns = ['identifier', 'label', 'cost', 'symbol'];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({ products: this.rows });

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }

  constructor(private dataService: DataService, private fb: FormBuilder,
              private af: AngularFireDatabase, private toaster: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
    this.dataService.getProducts(this.basePath).subscribe(products => {
      this.rows.clear();
      const productsArray = Object.keys(products).map(i => Object.assign(products[i], {identifier: i}));
      productsArray.forEach((product: ProductsCartItem) => this.addRow(product, true));
      this.updateView();
    });
  }

  addRow(product?: ProductsCartItem, noUpdate?: boolean) {
    const row = this.fb.group({
      identifier: [{ value: product && product.identifier ? product.identifier : null, disabled: true}],
      label: [{ value: product && product.label ? product.label : null, disabled: true}],
      cost: [{ value: product && product.cost ? product.cost : null, disabled: true}],
      photo: [{ value: product && product.photo ? product.photo : null, disabled: true}],
    });
    this.rows.push(row);
    if (!noUpdate) { this.updateView(); }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  createForm() {
    this.productsForm = this.fb.group({ label: ['', Validators.required ], cost: ['', Validators.required ] });

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  addProducts(label, cost) {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    const dataObj = {label, cost};
    this.dataService.pushUpload(this.currentUpload, dataObj, this.basePath);
    this.toaster.info('Товар успішно доданий.', 'Дякуємо!');
  }

  editProduct(product) {
    product.enable();
  }

  cancelEditProduct(product) {
    product.disable();
  }

  updateProduct(product) {
    this.af.object(this.basePath + '/' + product.value.identifier).update(product.value);
  }

  deleteProduct(product) {
    const deleteRef = firebase.storage().refFromURL(product.value.photo);
    console.log(deleteRef);
    deleteRef.delete().then(() => {
      console.log('image removed');
      this.af.object(this.basePath + '/' + product.value.identifier).remove();
    }).catch((error) => {
      if (error.code === 'storage/object-not-found') {
        this.af.object(this.basePath + '/' + product.value.identifier).remove();
      }
      console.log(error);
    });
  }

}
