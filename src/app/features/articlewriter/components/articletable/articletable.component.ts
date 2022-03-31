import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class ArticletableComponent implements OnInit {
  courseDropdown: boolean = false;
  courseDropdown2: boolean = false;
  articles: Article[] = [];
  @Input() editorId: string;

  // Temporarily population with all articles

  constructor(private db: AngularFirestore, private aStore: AuthStore) {}

  ngOnInit(): void {
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
            createdAt: '1',
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
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  deleteArticle(id) {
    console.log(`Article to be deleted: ${id}`);
    // this.articleStore.getArticleById(id);
    // this.db.collection('articles').where.get().subscribe((snapshot) => console.log(snapshot.docs.forEach((doc) =>
    //     this.articles.push({
    //       id: doc.id,
    //       category: doc.data()["category"],
    //       createdAt: "1",
    //       description: doc.data()["description"],
    //       editorId: doc.data()["editorId"],
    //       image: doc.data()["image"],
    //       title: doc.data()["title"],
    //     }))));
  }

  editArticle(id) {
    console.log(`Article to be edited: ${id}`);
  }

  toggleCourseDropdown(): void {
    this.courseDropdown = !this.courseDropdown;
    console.table(this.articles);
  }
  delete(id): void {
    this.courseDropdown2 = !this.courseDropdown2;
  }
}
