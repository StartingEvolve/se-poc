import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthStore } from '@se/core/store/auth/auth.store';

export interface Article {
  id: string;
  category: string;
  createdAt: string;
  description: string;
  editorId: string;
  image: string;
  title: string;
}
@Component({
  selector: 'se-articletable',
  templateUrl: './articletable.component.html',
  styleUrls: ['./articletable.component.scss']
})
export class ArticletableComponent implements OnChanges {
  articles: Article[] = [];
  @Input() editorId: string;

  constructor(private db: AngularFirestore) {}

  ngOnChanges(): void {
    this.articles = [];
    this.db
      .collection('articles', (ref) =>
        ref.where('editorId', '==', this.editorId)
      )
      .get()
      .subscribe((snap) =>
        snap.docs.forEach((doc) =>
          this.articles.push({
            id: doc.id,
            category: doc.data()['category'],
            createdAt: doc.data()['createdAt.formatted'],
            description: doc.data()['description'],
            editorId: doc.data()['editorId'],
            image: doc.data()['image'],
            title: doc.data()['title']
          })
        )
      );
    // get all articles
    // this.db.collection('articles').get().subscribe((snapshot) => console.log(snapshot.docs.forEach((doc) =>
    //   this.articles.push({
    //     id: doc.id,
    //     category: doc.data()["category"],
    //     createdAt: "1",
    //     description: doc.data()["description"],
    //     editorId: doc.data()["editorId"],
    //     image: doc.data()["image"],
    //     title: doc.data()["title"]
    //   }))));
  }
}
