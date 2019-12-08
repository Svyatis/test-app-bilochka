import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 767) {
      window.scrollTo({
        top: window.innerHeight - 30,
        behavior: 'smooth'
      });
    }
  }
}
