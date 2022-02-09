import { Component, Input, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import TinySliderConfig from '@vendors/tiny-slider/tiny-slider.config';

export interface Script {
  scriptUrl: string;
  isLoaded: boolean;
}

export interface ThirdPartyLibrary {
  scripts: string[];
  styles: string[];
}

@Component({
  selector: 'se-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
//Todo (zack): Refactor the component behavior into a webworker & create a scripts service
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() carouselItems: any[];
  tinySliderConfig: any;
  scripts: Script[];
  libConfig: ThirdPartyLibrary;

  //Todo (zack) : Load component dynamically with view containers
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    this.libConfig = {
      scripts: ['../../assets/vendors/tiny-slider/tiny-slider.js'],
      styles: ['../../assets/vendors/tiny-slider/tiny-slider.min.css']
    };
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
        title: "Qu'est-ce qu'un titre professionnel ?",
        description:
          "Vous avez du mal à faire la distinction entre un diplôme d'Etat et un titre professionnel ? Vous avez déjà lu ou entendu qu'un titre professionnel pouvait booster une carrière ou faciliter un projet d'évolution ou de reconversion mais vous ne savez pas sous quelle forme se déroule ce type de formation ? Vous vous demandez s'il existe un titre professionnel pour le métier que vous visez ? La lecture de cet article devrait vous éclairer !",
        img: 'professional.jpeg',
        articleId: ''
      },
      {
        title: 'Comment devenir technicien son',
        description:
          'Devenir technicien son ou ingénieur suppose d’avoir l’oreille musicale en plus d’un bagage technique. Roi de la console et artiste, souvent sensible à la musique, un bon ingénieur du son sait mêler technologie et sensibilité acoustique.',
        img: 'technician.jpeg',
        articleId: ''
      },
      {
        title: '22 métiers qui recrutent pour une reconversion en 2022',
        description:
          "Et si l'année 2022 était celle de votre reconversion professionnelle ? En manque d'inspiration ? Découvrez 22 métiers pour se reconvertir en 2022 !",
        img: 'metier.jpeg',
        articleId: ''
      },
      {
        title: "Qu'est-ce qu'un titre professionnel ?",
        description:
          "Vous avez du mal à faire la distinction entre un diplôme d'Etat et un titre professionnel ? Vous avez déjà lu ou entendu qu'un titre professionnel pouvait booster une carrière ou faciliter un projet d'évolution ou de reconversion mais vous ne savez pas sous quelle forme se déroule ce type de formation ? Vous vous demandez s'il existe un titre professionnel pour le métier que vous visez ? La lecture de cet article devrait vous éclairer !",
        img: 'professional.jpeg',
        articleId: ''
      },
      {
        title: 'Comment devenir technicien son',
        description:
          'Devenir technicien son ou ingénieur suppose d’avoir l’oreille musicale en plus d’un bagage technique. Roi de la console et artiste, souvent sensible à la musique, un bon ingénieur du son sait mêler technologie et sensibilité acoustique.',
        img: 'technician.jpeg',
        articleId: ''
      }
    ];
  }

  ngOnInit() {
    this.loadAPI();
  }

  //Todo (zack) : Separate mouse clicks with drag events
  navigateToArticle(articleId: string) {
    this.router.navigate(['article', articleId]);
  }

  loadBulkScripts(scriptUrls: string[]) {
    if (scriptUrls) {
      const promises: any[] = [];
      this.scripts = scriptUrls.map((script) => {
        return {
          scriptUrl: script,
          isLoaded: false
        };
      });
      console.log(this.scripts);
      this.scripts.forEach((script) =>
        promises.push(this.loadScript(script.scriptUrl))
      );
      return Promise.all(promises);
    }
    return null;
  }

  //Todo (zack): find an interface between local dynamic scripts and local configuration
  //i.e : I want to be able to interact with the slider object from within the component
  //If it ends up adding substantial accidental complexity, I'll create a wrapper for API calls between the script and the component

  loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.type = 'text/javascript';
      script.async = false;
      //Avoid race conditions in Window global variables
      script.onload = () => {
        for (let s of this.scripts) {
          if (s.scriptUrl === scriptUrl) {
            s.isLoaded = true;
            resolve({ script: scriptUrl, loaded: true });
          }
        }
      };
      script.onerror = () => reject({ scriptUrl, isLoaded: false });
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  loadConfig() {
    this.tinySliderConfig = new TinySliderConfig();
  }

  loadStyle(styleUrls: string[]) {
    if (styleUrls) {
      const head = this.document.getElementsByTagName('head')[0];

      for (let i of styleUrls) {
        const style = this.document.createElement('link');
        style.id = 'article-carousel';
        style.rel = 'stylesheet';
        style.href = i;
        head.appendChild(style);
      }
    }
  }

  loadAPI() {
    this.loadStyle(this.libConfig.styles);
    this.loadBulkScripts(this.libConfig.scripts).then(() => this.loadConfig());
  }

  //Dynamically loaded scripts are discarded on every route navigation
  // reloadScripts() {
  //   this.routerEvent$ = this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe((event: NavigationEnd) => {
  //       if (event.url === this.componentRoute) {
  //         // this.router.navigate([this.componentRoute]);
  //         console.log(event);
  //       }
  //     });
  // }

  //Todo: Clear the scripts on destroy
  ngOnDestroy() {
    // if (this.routerEvent$) {
    //   this.routerEvent$.unsubscribe();
    // }
    this.tinySliderConfig.destroy();
  }
}
