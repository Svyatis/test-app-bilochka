import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements OnInit {
    windowInnerWidth = new Subject<any>();
    listener;

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.windowInnerWidth.subscribe(size => {
            if (size > 767) {
                this.listener = this.renderer.listen('window', 'scroll', (event) => {
                    console.log('feefw');
                    if (window.scrollY >= 200 || window.pageYOffset >= 200) {
                        this.renderer.addClass(this.element.nativeElement, 'scrolled');
                    } else {
                        this.renderer.removeClass(this.element.nativeElement, 'scrolled');
                    }
                });
            } else if (this.listener) {
                this.listener();
            }
        });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.windowInnerWidth.next(event.target.innerWidth);
    }
}
