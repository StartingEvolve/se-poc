import { Component, Input, OnInit } from '@angular/core';
import { sideBarItem } from '../../views/course/course.component';

@Component({
  selector: 'se-general-informations',
  templateUrl: './general-informations.component.html',
  styleUrls: ['./general-informations.component.scss']
})
export class GeneralInformationsComponent {
  isOpen: boolean;
  aundienceItems: string[];
  audienceActiveItems: string[];
  @Input() data: sideBarItem;
  constructor() {
    this.isOpen = false;
    this.aundienceItems = [
      'Entreprise',
      'Etudiant',
      'Salarié en poste',
      "Demandeur d'emploi"
    ];
    this.audienceActiveItems = [];
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  addOrRemove(item: string) {
    if (this.audienceActiveItems.includes(item)) {
      this.audienceActiveItems = this.audienceActiveItems.filter(
        (itemx) => itemx != item
      );
    } else {
      this.audienceActiveItems.push(item);
    }
  }
}
export function remove(...forDeletion) {
  return this.filter((item) => !forDeletion.includes(item));
}
