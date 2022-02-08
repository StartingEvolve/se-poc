import { Component, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'se-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() carouselItems: any[];

  //Todo (zack) : sync script loading with rendering without relying on the constructor
  constructor(@Inject(DOCUMENT) private document: Document) {
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
    this.loadStyle();
    this.loadScripts();
  }

  //Todo (zack) : Separate mouse clicks with drag events

  //Todo (zack): find an interface between local dynamic scripts and local configuration
  //i.e : I want to be able to interact with the slider object from within the component
  //If it ends up adding substantial accidental complexity, I'll create a wrapper for API calls between the script and the component
  loadScripts() {
    // This array contains all the files/CDNs
    const dynamicScripts = [
      '../../assets/vendors/tiny-slider/tiny-slider.js',
      '../../assets/vendors/tiny-slider/tiny-slider.config.js'
    ];
    for (let i of dynamicScripts) {
      const node = document.createElement('script');
      node.src = i;
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  loadStyle() {
    const head = this.document.getElementsByTagName('head')[0];

    const style = this.document.createElement('link');
    style.id = 'article-carousel';
    style.rel = 'stylesheet';
    style.href = '../../assets/vendors/tiny-slider/tiny-slider.min.css';

    head.appendChild(style);
  }
  //Todo: Clear the scripts on destroy
}
