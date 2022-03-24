import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private db: AngularFirestore) {}

  getEditorById(id: string): Observable<any> {
    return this.db.doc('editors/' + id).valueChanges();
  }

  getArticleById(id: string): Observable<any> {
    return this.db.doc('articles_info/' + id).valueChanges();
  }
}
