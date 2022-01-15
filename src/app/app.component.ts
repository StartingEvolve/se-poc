import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'se-poc';
  items: Observable<any>;
  constructor(private store: AngularFirestore) {
    this.items = store.collection('items').valueChanges();
  }
}
