import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  lat = 49.8434851;
  lng = 24.0265212;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 767) {
      window.scrollTo({
        top: window.innerHeight - 30
      });
    }
  }
}
