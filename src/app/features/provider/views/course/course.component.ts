import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throws } from 'assert';
import { generalInformationsObject } from '../../components/general-informations/general-informations.component';
export interface sideBarItem {
  id: number;
  name: string;
  description: string;
  checked: boolean;
}
export interface currentObject {
  general?: generalInformationsObject;
}
@Component({
  selector: 'se-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CoursesComponent {
  isWide: boolean = true;
  activeId: number = 1;
  currentObject: currentObject;
  sideBarItems: sideBarItem[];
  constructor(private route: ActivatedRoute) {
    this.currentObject = {};
    this.currentObject.general = Object.assign({
      title: 'Ici le titre x',
      audience: ['Entreprise']
    });
    this.sideBarItems = [
      {
        id: 1,
        name: 'Informations génerales',
        description:
          'Les informations générales de cette formation(Ex:Titre,description...)',
        checked: false
      },
      {
        id: 2,
        name: 'Objectifs',
        description:
          "Description de ce qu'il sera couvert dans cette formation. Voici un exemple d'objectifs : Les élèves acquerront une compréhension des origines historiques de l'histoire de l'art.",
        checked: false
      },
      {
        id: 3,
        name: 'Programme',
        description: 'Description du progamme couvert dans cette formation',
        checked: false
      },
      {
        id: 4,
        name: 'Formateurs',
        description:
          'Ajouter les instructeurs de cette formation avec une photo professionnelle avec un fond blanc',
        checked: false
      },
      {
        id: 5,
        name: 'Certificats',
        description:
          "Ajouter s'il existe des certificats à la fin de cette formation",
        checked: false
      },
      {
        id: 6,
        name: 'Aperçu',
        description:
          'Un petit résumé de tout ce qui est mentionné dans les autres sections,ça sera dans la première page de la formation',
        checked: false
      }
    ];
    this.route.queryParams.subscribe((params) => {
      this.currentObject.general = Object.assign(params);
    });
  }
  sendGeneralInfosData(object: generalInformationsObject) {
    this.currentObject.general = Object.assign(object);
    this.sideBarItems[0].checked = true;
    console.log(this.currentObject);
    this.activeId = 2;
  }
  toggleSidebar() {
    this.isWide = !this.isWide;
  }
  selectActiveItem(id: number) {
    this.activeId = id;
  }
}
