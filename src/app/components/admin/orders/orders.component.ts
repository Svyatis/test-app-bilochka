import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataService } from '../../../shared/services/data.service';
import { OrdersItem } from 'src/app/shared/entities/product-cart-item';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminOrdersComponent implements OnInit {
  basePath = '/orders';
  displayedColumns = ['date', 'totalCost', 'name', 'phone', 'email',  'identifier'];
  dataSource: MatTableDataSource<any>;
  expandedElement: OrdersItem;
  columnNames = {
    date: 'Дата',
    totalCost: 'Сума',
    name: 'Ім\'я',
    phone: 'Телефон',
    email: 'Пошта',
    identifier: 'ІД'
  };

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (!Object.entries) {
      Object.entries = (obj) => {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i);
        while (i--) {
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
        }

        return resArray;
      };
    }

    this.dataService.getProducts(this.basePath).subscribe(products => {
      if (products) {
        this.dataSource = new MatTableDataSource();
        for (const [key, element] of Object.entries(products)) {
          Object.keys(element).map(i => this.dataSource.data.push(Object.assign(element[i], {identifier: i, date: key})));
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
