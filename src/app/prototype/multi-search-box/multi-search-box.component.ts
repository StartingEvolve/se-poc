import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'se-multi-search-box',
  templateUrl: './multi-search-box.component.html',
  styleUrls: ['./multi-search-box.component.scss']
})
export class MultiSearchBoxComponent implements OnInit {
  sp: any;
  flagDropdown: boolean = false;
  activeItem: string;
  dropDownItems: { name: string; icon: string }[];

  constructor(private ts: TranslateService) {
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
      this.sp.clearChange();
      this.sp.clearTimersOnLangChange();

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
}

//Todo (zack) : Convert to ES6 & Refactor -> destination : Utility functions
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
      this.clearChange();
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
      clearInterval(this.intervalId);
      this.timeoutId = setTimeout(this.goReverse.bind(this), this.options.stay);
    }

    this.setPlaceholder();

    this.charIdx++;
  };

  this.init = function () {
    this.intervalId = setInterval(this.onTick.bind(this), this.options.speed);
  };

  this.clearChange = function () {
    clearInterval(this.intervalId);
  };

  this.clearTimersOnLangChange = function () {
    clearTimeout(this.timeoutId);
  };
}
