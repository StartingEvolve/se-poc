import { ThisReceiver } from '@angular/compiler';
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';

@Component({
  selector: 'se-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('CarouselInner') CarouselInner: ElementRef;
  @Input() carouselItems: any[];
  constructor() {
    this.carouselItems;
  }

  ngAfterViewInit() {
    this.onResize();
  }
  onResize() {
    setTimeout(() => {
      this.toggleCarouselBtns();
    }, 200);
  }

  onCarouselArrowClick(direction: any) {
    let carouselOffsetWidth = this.CarouselInner.nativeElement.offsetWidth;
    let carouselItemWIdth =
      document.querySelector('.carousel-item').clientWidth;
    let carouselScrollWidth = this.CarouselInner.nativeElement.scrollWidth;
    if (direction == 'left')
      this.CarouselInner.nativeElement.scrollTo({
        left:
          this.CarouselInner.nativeElement.scrollLeft -
          carouselOffsetWidth +
          carouselItemWIdth,
        behavior: 'smooth'
      });
    else
      this.CarouselInner.nativeElement.scrollTo({
        left:
          this.CarouselInner.nativeElement.scrollLeft +
          carouselOffsetWidth -
          carouselItemWIdth,
        behavior: 'smooth'
      });

    setTimeout(() => {
      this.toggleCarouselBtns();
    }, 500);
  }

  toggleCarouselBtns() {
    let carouselScrollWidth = this.CarouselInner.nativeElement.scrollWidth;
    let carouselOffsetWidth = this.CarouselInner.nativeElement.offsetWidth;
    let scrollLeft = this.CarouselInner.nativeElement.scrollLeft;
    let carouselNextBtn: HTMLElement =
      document.getElementById('carousel-next-btn');
    let carouselPrevBtn: HTMLElement =
      document.getElementById('carousel-prev-btn');

    if (scrollLeft > 5) carouselPrevBtn.classList.remove('d-none');
    else carouselPrevBtn.classList.add('d-none');

    if (carouselOffsetWidth + scrollLeft + 15 >= carouselScrollWidth)
      carouselNextBtn.classList.add('d-none');
    else carouselNextBtn.classList.remove('d-none');
  }

  onSwipe(swipe: any) {
    //swipe-right = 4 & swipe-left = 2
    console.log(swipe);
    if (swipe.direction == 4) {
      this.CarouselInner.nativeElement.scrollTo({
        left: this.CarouselInner.nativeElement.scrollLeft - swipe.distance,
        behavior: 'smooth'
      });
    }
    if (swipe.direction == 2) {
      this.CarouselInner.nativeElement.scrollTo({
        left: this.CarouselInner.nativeElement.scrollLeft + swipe.distance,
        behavior: 'smooth'
      });
    }
    console.log(swipe.direction);
    setTimeout(() => {
      this.toggleCarouselBtns();
    }, 500);
  }
}
