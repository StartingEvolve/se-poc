import { Component, Input, ViewChild } from '@angular/core';
import { Article } from '@se/features/auth/components/article-carousel-item/article-carousel-item.component';
import {
  Carousel,
  CarouselComponent
} from '@shared/components/carousel/carousel.component';

@Component({
  selector: 'se-article-carousel',
  templateUrl: './article-carousel.component.html',
  styleUrls: ['./article-carousel.component.scss']
})
export class ArticleCarouselComponent implements Carousel {
  @Input() carouselItems: Article[];
  @ViewChild('Carousel') carouselComponent: CarouselComponent;
  carouselMetaData: { container: string; route: string };

  constructor() {
    this.carouselMetaData = {
      container: 'article',
      route: 'article'
    };
  }

  setCarouselItemId(itemId: string) {
    console.log(itemId);
    this.carouselComponent.setCarouselItemId(itemId);
  }
}
