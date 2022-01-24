import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'se-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  sp: any;
  constructor(private ts: TranslateService) {
    this.ts.onDefaultLangChange.subscribe((lang) => {
      console.log(lang);
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
}
export function SuperPlaceholder(options) {
  console.log(options);
  this.options = options;
  this.element = options.element;
  this.placeholderIdx = 0;
  this.charIdx = 0;

  this.setPlaceholder = function () {
    let placeholder = options.placeholders[this.placeholderIdx];
    var placeholderChunk = placeholder.substring(0, this.charIdx + 1);
    document
      .querySelector(this.element)
      .setAttribute(
        'placeholder',
        this.options.preText + ' ' + placeholderChunk
      );
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
    return;
  };
}
