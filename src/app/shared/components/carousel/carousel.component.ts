import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { OnVendorChangeConfig } from '@core/store/vendor/vendor.store';
import { Router } from '@angular/router';
import { fromEvent, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VendorService } from '@core/services/vendor.service';

import TinySliderConfig from '@vendors/tiny-slider/tiny-slider.config';

@Component({
  selector: 'se-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent
  implements OnInit, AfterViewInit, OnDestroy, OnVendorChangeConfig
{
  @Input() carouselItems: any[];
  @ViewChild('CarouselInner') carouselInnerElem: ElementRef;
  carouselItemId: string;
  mouseEvent: any = {};
  tinySliderConfig: any = {};

  //Todo (zack) : Load component dynamically with view containers
  private readonly libraries: string[];
  private storeSub: Subscription;

  constructor(private router: Router, private venService: VendorService) {
    this.libraries = ['tiny-slider'];
  }

  setCarouselItemId(itemId: string) {
    this.carouselItemId = itemId;
  }

  navigateToArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }

  ignoreDragClicks() {
    const mousedown$ = fromEvent(
      this.carouselInnerElem.nativeElement,
      'mousedown'
    );

    //Ignore drag events that trigger a click
    const mouseup$ = fromEvent(this.carouselInnerElem.nativeElement, 'mouseup');

    this.mouseEvent.mousedownSub = mousedown$.subscribe(() => {
      const clickTimer$ = timer(100);
      this.mouseEvent.mouseupSub = mouseup$
        .pipe(takeUntil(clickTimer$))
        .subscribe(() => this.navigateToArticle(this.carouselItemId));
    });
  }

  seOnVendorChangeConfig() {
    this.tinySliderConfig = new TinySliderConfig();
  }

  ngOnInit() {
    this.venService.use(this.libraries);
  }

  ngAfterViewInit() {
    //It's important to subscribe at the right lifecycle hook, as a rule of thumb when loading
    //scripts that interacts with the DOM, subscription must trigger the configuration only after
    //the View is initialized (Component DOM data structure is built)
    this.storeSub = this.venService.watchVendorChanges(
      this.libraries,
      this.seOnVendorChangeConfig
    );

    this.ignoreDragClicks();
  }

  //Todo: Clear the scripts on destroy | find a better way for bulk unsub
  ngOnDestroy() {
    if (this.mouseEvent.mousedownSub)
      this.mouseEvent.mousedownSub.unsubscribe();
    if (this.mouseEvent.mouseupSub) this.mouseEvent.mouseupSub.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();

    this.tinySliderConfig.destroy();
  }
}
