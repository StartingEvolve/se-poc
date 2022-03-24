import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '@se/models/article';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleStore } from '@core/store/article/article.store';

@Component({
  selector: 'se-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  article: any;
  uuid: string;
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStore
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.subs.push(
      this.route.paramMap.subscribe((paramMap) => {
        this.uuid = paramMap.get('uuid');
        this.articleStore.getArticleById(this.uuid);
        this.subs.push(
          this.articleStore.stateChanged.subscribe((value) => {
            console.log(value);
            this.article = value;
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
