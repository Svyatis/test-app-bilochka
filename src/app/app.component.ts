import { Component, OnInit } from '@angular/core';
import { CartService } from 'ng-shopping-cart';
import { ProductsCartItem } from './shared/entities/product-cart-item';
import { AuthService } from './shared/services/auth.service';
import { SwUpdate } from '@angular/service-worker';

declare global {
  interface JQuery {
      vegas: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bilochka';
  date = new Date().getFullYear();
  backgroundImage = '../assets/img/bg/bg1.jpg';
  user: firebase.User;
  wordNumber = 1;
  images = [
    { src: '../assets/img/bg/bg2.jpg' },
    { src: '../assets/img/bg/bg3.jpg' },
    { src: '../assets/img/bg/bg4.jpg' },
    { src: '../assets/img/bg/bg5.jpg' },
    { src: '../assets/img/bg/bg1.jpg' }
  ];
  commercialWords = ['поживні', 'надзвичайно смачні', 'корисні'];
  manyItemsText = '# товари';

  constructor(public cartService: CartService<ProductsCartItem>, private authService: AuthService, private swUpdate: SwUpdate) {
    const format = 'UAH' + ':' + '₴ ' + ':' + '1.2' + ':' + 'auto';
    this.cartService.setLocaleFormat(format);
  }

  ngOnInit() {
    this.authService.user.subscribe(user => { this.user = user; });
    $(document).click((e) => {
      ($('#main-navigation') as any).collapse('hide');
    });

    if (navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/7\./)) {
      document.body.addEventListener('mousewheel', () => {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        // tslint:disable-next-line:no-string-literal
        const wd = event['wheelDelta'];
        const csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
      });
    }

    setTimeout(() => {
      $('#headerwrap .backstretch').vegas({
        slides: this.images,
        timer: false,
        valign: 'top',
        delay: 8000
      });
    }, 6000);

    this.commercialSlider();

    this.cartService.onItemsChanged.subscribe(value => {
      this.setCartSummaryItemsText(value);
    });

    this.setCartSummaryItemsText(this.cartService.itemCount());
  }

  setCartSummaryItemsText(value: number) {
    if (value > 4) {
      this.manyItemsText = '# товарів';
    } else {
      this.manyItemsText = '# товари';
    }
  }

  logOut() {
    this.authService.signOut();
  }

  commercialSlider() {
    setInterval(() => {
      $('#intro-commercial').fadeOut(500, () => {
        $('#intro-commercial').text(this.commercialWords[this.wordNumber = ++this.wordNumber % this.commercialWords.length]).fadeIn(500);
      });
    }, 2000);
  }
}
