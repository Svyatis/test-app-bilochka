import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/services/data.service';
import { ProductsBaseComponent } from 'src/app/shared/components/products-base/products-base.component';
import { FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gifts',
  templateUrl: '../../../../shared/components/products-base/products-base.component.html',
  styleUrls: ['../../../../shared/components/products-base/products-base.component.css']
})
export class GiftsComponent extends ProductsBaseComponent implements OnInit {

  constructor(dataService: DataService, toaster: ToastrService, router: Router, public dialog: MatDialog, route: ActivatedRoute,
              fb: FormBuilder, us: UtilsService) {
    super(dataService, toaster, router, dialog, route, fb, us);
    this.basePath = '/gifts';
  }
}
