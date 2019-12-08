import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { DataService } from '../../../shared/services/data.service';
import { AdminBaseComponent } from '../../../shared/components/admin-base/admin-base.component';

@Component({
  selector: 'app-admin-fruits',
  templateUrl: '../../../shared/components/admin-base/admin-base.component.html',
  styleUrls: ['../../../shared/components/admin-base/admin-base.component.css']
})
export class AdminFruitsComponent extends AdminBaseComponent {

  constructor(dataService: DataService, fb: FormBuilder, af: AngularFireDatabase, toaster: ToastrService) {
    super(dataService, fb, af, toaster);
    this.basePath = '/fruits';
  }
}
