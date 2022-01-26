import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TestStore } from '@se/core/store/test/test.store';
import { AuthStore } from './core/store/auth/auth.store';

@Component({
  selector: 'se-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  buttonDisplay: boolean = true;
  subs: Subscription = new Subscription();
  message: string;
  title = 'se-poc';
  items: Observable<any>;
  constructor(
    private store: AngularFirestore,
    private ts: AuthStore,
    private tr: TranslateService
  ) {}
  ngOnInit() {
    this.tr.setDefaultLang('en');
    this.subs.add(
      this.ts.stateChanged.subscribe((state) => {
        if (state) {
          console.log(state);
        }
      })
    );
  }
  ClickHandle() {
    // this.ts.changeValue();
  }
  hide() {
    this.buttonDisplay = false;
  }
}
