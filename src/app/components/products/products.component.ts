import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ngOnInit() {
    if (window.innerWidth < 767) {
      window.scrollTo({
        top: window.innerHeight - 30,
        behavior: 'smooth'
      });
    }
  }
}
