import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { detailsObject } from '../../components/details/details.component';
export interface completeObject {
  title?: string;
  category?: string;
  details?: detailsObject;
}

@Component({
  selector: 'se-create-stepper',
  templateUrl: './create-stepper.component.html',
  styleUrls: ['./create-stepper.component.scss']
})
export class CreateStepperComponent {
  steps = ['Choix du titre', 'Catégorie', 'Détails sur la prestation'];
  currentStep: number = 1;
  currentObject: completeObject;
  constructor(private router: Router) {
    this.currentObject = {};
  }
  onTitleNext(value: string) {
    this.currentObject.title = value;
    window.scrollTo(0, 0);
    this.currentStep = 2;
  }
  onCategoryNext(value: string) {
    this.currentObject.category = value;
    window.scrollTo(0, 0);
    this.currentStep = 3;
  }
  onDetailsNext(value: detailsObject) {
    this.currentObject.details = Object.assign(value);
    this.router.navigate(['provider', 'course'], {
      queryParams: {
        title: this.currentObject.title,
        learning_mode: this.currentObject.details.mode,
        audience: this.currentObject.details.pub,
        category: this.currentObject.category
      }
    });
    window.scrollTo(0, 0);
  }
  goBack(value) {
    if (this.currentStep == 1) {
      this.router.navigate(['provider']);
    } else {
      this.currentStep--;
    }
  }
}
