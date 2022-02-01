import { Component, OnInit } from '@angular/core';
export interface ArticleObject {
  id: string;
  title: string;
  mainImage: string;
  content: string;
}
@Component({
  selector: 'se-articleprototype',
  templateUrl: './articleprototype.component.html',
  styleUrls: ['./articleprototype.component.scss']
})
export class ArticleprototypeComponent {
  article: ArticleObject = {
    id: '2',
    title: "Qu'est-ce qu'un titre professionnel ?",
    mainImage: 'https://picsum.photos/1400/1000',
    content: ''
  };
  constructor() {}
}
