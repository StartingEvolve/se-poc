import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@se/core/services/auth.service';

@Component({
  selector: 'se-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  sp: any;
  flagDropdown: boolean = false;
  activeItem: string;
  dropDownItems: { name: string; icon: string }[];
  constructor(
    private ts: TranslateService,
    private as: AuthService,
    private afStore: AngularFirestore
  ) {
    this.dropDownItems = [
      {
        name: 'ARTICLES',
        icon: 'article.svg'
      },
      {
        name: 'FORMATIONS',
        icon: 'formation.svg'
      },
      {
        name: 'ADVICES',
        icon: 'advice.svg'
      }
    ];
    this.activeItem = 'ARTICLES';
    this.ts.onDefaultLangChange.subscribe((lang) => {
      this.sp.kill();
      this.sp = new SuperPlaceholder({
        placeholders: [
          this.ts.instant('AUTH.PLACEHOLDER1'),
          this.ts.instant('AUTH.PLACEHOLDER2'),
          this.ts.instant('AUTH.PLACEHOLDER3')
        ],
        preText: this.ts.instant('AUTH.EXAMPLE'),
        stay: 1000,
        speed: 100,
        element: '#dynamic-placeholder'
      });
      this.sp.init();
    });
  }
  ngOnInit(): void {
    this.sp = new SuperPlaceholder({
      placeholders: [
        this.ts.instant('AUTH.PLACEHOLDER1'),
        this.ts.instant('AUTH.PLACEHOLDER2'),
        this.ts.instant('AUTH.PLACEHOLDER3')
      ],
      preText: this.ts.instant('AUTH.EXAMPLE'),
      stay: 1000,
      speed: 100,
      element: '#dynamic-placeholder'
    });
    this.sp.init();
  }
  toggleDropdown() {
    this.flagDropdown = !this.flagDropdown;
  }
  setActiveItem(name: string) {
    this.toggleDropdown();
    this.activeItem = name;
  }
  signin() {
    // this.as
    //   .loginUser('saaderraz99@gmail.com', 'SE300799')
    //   .then((result) => console.log(result))
    //   .catch((error) => {
    //     console.log('This is an error');
    //     console.log(error);
    //   });
    this.as.signupUser({
      email: 'saaderraz@gmail.com',
      password: 'SE300799',
      displayName: 'Saad Errazgouni'
    });
  }
  doSomethingWeird() {
    this.afStore.doc('/users/saad.errazgouni99@gmail.com').set({
      accountType: 'test',
      displayName: 't',
      displayName_lower: 't',
      email: 't',
      email_lower: 't'
    });
  }
}
export function SuperPlaceholder(options) {
  this.options = options;
  this.element = options.element;
  this.placeholderIdx = 0;
  this.charIdx = 0;

  this.setPlaceholder = function () {
    let placeholder = options.placeholders[this.placeholderIdx];
    var placeholderChunk = placeholder.substring(0, this.charIdx + 1);
    const element = document.querySelector(this.element);
    if (element !== null) {
      element.setAttribute(
        'placeholder',
        this.options.preText + ' ' + placeholderChunk
      );
    } else {
      //todo (zack) : investigate superplaceholder flickering on lang change  https://codepen.io/joelewis/pen/ePOrmV
      this.kill();
    }
  };

  this.onTickReverse = function (afterReverse) {
    if (this.charIdx === 0) {
      afterReverse.bind(this)();
      clearInterval(this.intervalId);
      this.init();
    } else {
      this.setPlaceholder();
      this.charIdx--;
    }
  };

  this.goReverse = function () {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(
      this.onTickReverse.bind(this, function () {
        this.charIdx = 0;
        this.placeholderIdx++;
        if (this.placeholderIdx === options.placeholders.length) {
          // end of all placeholders reached
          this.placeholderIdx = 0;
        }
      }),
      this.options.speed
    );
  };

  this.onTick = function () {
    var placeholder = options.placeholders[this.placeholderIdx];
    if (this.charIdx === placeholder.length) {
      // end of a placeholder sentence reached
      setTimeout(this.goReverse.bind(this), this.options.stay);
    }

    this.setPlaceholder();

    this.charIdx++;
  };

  this.init = function () {
    this.intervalId = setInterval(this.onTick.bind(this), this.options.speed);
  };

  this.kill = function () {
    clearInterval(this.intervalId);
  };
}
