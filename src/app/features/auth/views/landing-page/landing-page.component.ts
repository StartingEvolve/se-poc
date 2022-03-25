import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'se-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  sp: any;
  flagDropdown: boolean = false;
  activeItem: string;
  carouselItems: any[];
  dropDownItems: { name: string; route: string; icon: string }[];

  constructor(private ts: TranslateService) {
    this.dropDownItems = [
      {
        name: 'ARTICLES',
        route: 'articles',
        icon: 'article.svg'
      },
      {
        name: 'FORMATIONS',
        route: 'courses',
        icon: 'formation.svg'
      }
      // {
      //   name: 'ADVICES',
      //   route: 'advices',
      //   icon: 'advice.svg'
      // }
    ];
    this.carouselItems = [
      {
        title: 'Datamining avec python',
        description:
          'Le Data mining est la pratique consistant à rechercher automatiquement de grandes quantités de données afin de découvrir des tendances et des modèles',
        img: 'metier.jpeg',
        articleId: '1'
      },
      {
        title: "Qu'est-ce qu'un titre professionnel ?",
        description:
          "Vous avez du mal à faire la distinction entre un diplôme d'Etat et un titre professionnel ? Vous avez déjà lu ou entendu qu'un titre professionnel pouvait booster une carrière ou faciliter un projet d'évolution ou de reconversion mais vous ne savez pas sous quelle forme se déroule ce type de formation ? Vous vous demandez s'il existe un titre professionnel pour le métier que vous visez ? La lecture de cet article devrait vous éclairer !",
        img: 'professional.jpeg',
        articleId: '2'
      },
      {
        title: 'Comment devenir technicien son',
        description:
          'Devenir technicien son ou ingénieur suppose d’avoir l’oreille musicale en plus d’un bagage technique. Roi de la console et artiste, souvent sensible à la musique, un bon ingénieur du son sait mêler technologie et sensibilité acoustique.',
        img: 'technician.jpeg',
        articleId: '3'
      },
      {
        title: '22 métiers qui recrutent pour une reconversion en 2022',
        description:
          "Et si l'année 2022 était celle de votre reconversion professionnelle ? En manque d'inspiration ? Découvrez 22 métiers pour se reconvertir en 2022 !",
        img: 'metier.jpeg',
        articleId: '4'
      },
      {
        title: 'Comment devenir technicien son',
        description:
          'Devenir technicien son ou ingénieur suppose d’avoir l’oreille musicale en plus d’un bagage technique. Roi de la console et artiste, souvent sensible à la musique, un bon ingénieur du son sait mêler technologie et sensibilité acoustique.',
        img: 'technician.jpeg',
        articleId: '5'
      },
      {
        title: 'Datamining avec python',
        description:
          'Le Data mining est la pratique consistant à rechercher automatiquement de grandes quantités de données afin de découvrir des tendances et des modèles',
        img: 'metier.jpeg',
        articleId: '6'
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
