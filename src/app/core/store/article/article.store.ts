import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { ArticleService } from '@core/services/article.service';
import { Subscription } from 'rxjs';

//Todo (zack) code clean up
export interface ArticleState {
  // articles: ArticleInfo[];
  article: any;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleStore extends ObservableStore<ArticleState> {
  private articleSub: Subscription;
  private editorSub: Subscription;

  constructor(private articleService: ArticleService) {
    super({ trackStateHistory: true, logStateChanges: true });

    const initialState = {};

    this.setState(initialState, ArticleStoreActions.InitializeArticles);
  }

  getArticleById(id: string) {
    this.articleSub = this.articleService
      .getArticleById(id)
      .subscribe((article) => {
        console.log(article);
        this.editorSub = this.articleService
          .getEditorById(article.editorId)
          .subscribe((editor) => {
            this.setState(
              { ...article, editor: { ...editor } },
              ArticleStoreActions.AddArticle
            );
            this.editorSub.unsubscribe();
          });
        //Getting Data only once
        this.articleSub.unsubscribe();
      });
  }
  updateArticle(article: any) {
    this.setState({}, ArticleStoreActions.UpdateArticle);
  }
}

export enum ArticleStoreActions {
  InitializeArticles = 'INITIALIZE_ARTICLE_STORE',
  AddArticle = 'ADD_ARTICLE',
  UpdateArticle = 'UPDATE_ARTICLE'
}
