import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthStore } from './core/store/auth/auth.store';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { LoaderService } from './core/services/loader.service';

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
    private tr: TranslateService,
    public ls: LoaderService
  ) {}
  ngOnInit() {
    this.tr.setDefaultLang('en');
  }
  ClickHandle() {
    // this.ts.changeValue();
  }
  hide() {
    this.buttonDisplay = false;
  }
}
