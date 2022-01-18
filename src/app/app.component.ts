import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { TestService } from './core/store/test/test.service';
import { map } from 'rxjs/operators';
import { Test } from './core/store/test/test';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  subs: Subscription = new Subscription();
  message: string = 'Test';
  title = 'se-poc';
  items: Observable<any>;
  constructor(private store: AngularFirestore, private ts: TestService) {
    this.items = store.collection('items').valueChanges();
  }
  ngOnInit() {
    this.subs.add(
      this.ts.stateChanged.subscribe((state) => {
        if (state) {
          this.message = state.message;
        }
      })
    );
  }
  ClickHandle() {
    this.ts.changeValue();
  }
}
