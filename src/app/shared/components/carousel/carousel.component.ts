import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';
import { Config, OnVendorChangeConfig } from '@core/store/vendor/vendor.store';
import { Router } from '@angular/router';
import { fromEvent, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VendorService } from '@core/services/vendor.service';

import TinySliderConfig from '@vendors/tiny-slider/tiny-slider.config';

export interface Carousel {
  setCarouselItemId(itemId: string): void;
}

interface CarouselMetaData {
  route: string;
  container: string;
}

//Todo (zack) : add the ability to toggle carousel buttons on item changes
@Component({
  selector: 'se-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent
  implements OnInit, AfterViewInit, OnDestroy, OnVendorChangeConfig
{
  @ViewChild('CarouselInner') carouselInnerElem: ElementRef;
  @Input() carouselMetaData: CarouselMetaData;
  carouselItemId: string;
  mouseEvent: any = {};
  configurations: Config;

  //Todo (zack) : Load component dynamically with view containers
  private readonly libraries: string[];
  private storeSub: Subscription;

  constructor(private router: Router, private venService: VendorService) {
    this.libraries = ['tiny-slider'];
    this.venService.getConfigObjects(this.libraries).then((config) => {
      this.configurations = config;
    });
  }

  setCarouselItemId(itemId: string) {
    this.carouselItemId = itemId;
  }

  navigateToItem(articleId: string) {
    this.router.navigate([this.carouselMetaData.route, articleId]);
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
        .subscribe(() => {
          if (this.mouseEvent.mouseupSub)
            this.mouseEvent.mouseupSub.unsubscribe();
          if (this.carouselItemId) {
            this.navigateToItem(this.carouselItemId);
          }
        });
    });
  }

  seOnVendorChangeConfig() {
    const configMap = new Map();
    configMap.set('tiny-slider', [
      new TinySliderConfig(this.carouselMetaData.container)
    ]);
    return configMap;
  }

  ngOnInit() {
    this.venService.use(this.libraries);
  }

  ngAfterViewInit() {
    //It's important to subscribe at the right lifecycle hook, as a rule of thumb when loading
    //scripts that interacts with the DOM, subscription must trigger the configuration only after
    //the View is initialized (Component DOM data structure is built)
    this.storeSub = this.venService.watchVendorChanges(
      this,
      this.libraries,
      this.seOnVendorChangeConfig
    );

    this.ignoreDragClicks();
  }

  //Todo: Clear the scripts on destroy | find a better way for bulk unsub
  ngOnDestroy() {
    if (this.mouseEvent.mousedownSub)
      this.mouseEvent.mousedownSub.unsubscribe();
    if (this.storeSub) this.storeSub.unsubscribe();

    this.configurations.get('tiny-slider')[0].destroy();
  }
}
