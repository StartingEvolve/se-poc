import { Component, Input } from '@angular/core';

export interface Article {
  title: string;
  description: string;
  img: string;
  articleId: string;
}

@Component({
  selector: 'se-article-carousel-item',
  templateUrl: './article-carousel-item.component.html',
  styleUrls: ['./article-carousel-item.component.scss']
})
export class ArticleCarouselItemComponent {
  @Input() articleItem: Article;
  //No need for global state since the depth of the tree is shallow
}
