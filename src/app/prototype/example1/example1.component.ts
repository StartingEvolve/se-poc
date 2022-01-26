import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TestStore } from '@se/core/store/test/test.store';

@Component({
  selector: 'se-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit {
  buttonDisplay: boolean = true;
  subs: Subscription = new Subscription();
  message: string;
  title = 'se-poc';
  items: Observable<any>;
  constructor(
    private store: AngularFirestore,
    private ts: TestStore,
    private tr: TranslateService
  ) {
    this.items = store.collection('items').valueChanges({ idField: 'Test' });
  }
  ngOnInit() {
    this.tr.setDefaultLang('en');
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
  hide() {
    this.buttonDisplay = false;
  }
}
