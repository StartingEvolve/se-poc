import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthStore } from '@core/store/auth/auth.store';
import { LoaderService } from '@core/services/loader.service';
import { ChatbotService } from '@core/services/chatbot.service';
import { SwUpdate } from '@angular/service-worker';

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
    public chatbotService: ChatbotService,
    private swUpdate: SwUpdate
  ) {
    //Todo (zack) : Test the caching behavior in mobile
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activated.subscribe((upd) => {
        window.location.reload();
      });
      this.swUpdate.available.subscribe(
        (upd) => {
          this.swUpdate.activateUpdate();
        },
        (error) => {
          console.error(error);
        }
      );
      this.swUpdate
        .checkForUpdate()
        .then(() => {})
        .catch((error) => {
          console.error("Couldn't check for app updates", error);
        });
    }
  }

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
