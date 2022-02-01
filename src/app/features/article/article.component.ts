import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ArticleObject {
  id: string;
  title: string;
  mainImage: string;
  content: string;
}

const articles: ArticleObject[] = [
  {
    id: '1',
    title: 'JavaScript for Beginners',
    mainImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3',
    content: ''
  },
  {
    id: '2',
    title: 'Datamining with Python',
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  },
  {
    id: '3',
    title: 'Zabba',
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  },
  {
    id: '4',
    title: 'Bruh',
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  }
];

@Component({
  selector: 'se-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: ArticleObject;

  content: string = '<div>HELLO<p class="dood">bruh</p></div>';

  constructor() {}

  ngOnInit(): void {
    // this.article = articles[Math.floor(Math.random() * articles.length)];
    this.article = articles.filter(
      (e) =>
        e.id ==
        window.location.href.split('/')[
          window.location.href.split('/').length - 1
        ]
    )[0];
  }

  logUrl() {
    console.log(
      window.location.href.split('/')[
        window.location.href.split('/').length - 1
      ]
    );
  }
}
