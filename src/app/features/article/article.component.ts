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
    title: 'Datamining avec python',
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  },
  {
    id: '2',
    title: "Qu'est-ce qu'un titre professionnel ?",
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  },
  {
    id: '3',
    title: 'Comment devenir technicien son',
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  },
  {
    id: '4',
    title: '22 métiers qui recrutent pour une reconversion en 2022',
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
}
