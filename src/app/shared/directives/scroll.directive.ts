import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

    constructor(private element: ElementRef, private renderer: Renderer2) { }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(event: any) {
        if (window.scrollY >= 200 || window.pageYOffset >= 200) {
            this.renderer.addClass(this.element.nativeElement, 'scrolled');
        } else {
            this.renderer.removeClass(this.element.nativeElement, 'scrolled');
        }

        if (window.scrollY >= 700 || window.pageYOffset >= 700) {
            this.renderer.addClass(this.element.nativeElement, 'overscrolled');
        } else {
            this.renderer.removeClass(this.element.nativeElement, 'overscrolled');
        }
    }
}
