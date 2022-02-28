import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthStore } from '@core/store/auth/auth.store';
import { LoaderService } from '@core/services/loader.service';
import { ChatbotService } from '@core/services/chatbot.service';

@Component({
  selector: 'se-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  buttonDisplay: boolean = true;
  message: string;
  title = 'se-poc';
  items: Observable<any>;

  constructor(
    private store: AngularFirestore,
    private ts: AuthStore,
    private tr: TranslateService,
    public ls: LoaderService,
    public chatbotService: ChatbotService
  ) {}

  ngOnInit() {
    this.ts.stateChanged.subscribe((state) => {
      if (state?.user?.language) {
        this.tr.setDefaultLang(state.user?.language);
      } else {
        this.tr.setDefaultLang('fr');
      }
    });
  }

  hide() {
    this.buttonDisplay = false;
  }
}
