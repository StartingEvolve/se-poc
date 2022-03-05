import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { accountInfosObject } from '../../components/account_informations/account_informations.component';
import { professionalInfosObject } from '../../components/professional-informations/professional-informations.component';
import { profileInfoObject } from '../../components/profile-informations/profile-informations.component';
export interface completeObject {
  account?: accountInfosObject;
  profile?: profileInfoObject;
  professional?: professionalInfosObject;
}

@Component({
  selector: 'se-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  steps = [
    'Informations de compte',
    'Informations personnelles',
    'Informations professionnelles'
  ];
  currentStep: number = 1;
  currentObject: completeObject;
  constructor(private router: Router) {
    this.currentObject = {};
  }
  onAccountInfosChanged(value: accountInfosObject) {
    this.currentObject.account = Object.assign(value);
    console.log(this.currentObject);
    this.currentStep = 2;
  }
  onProfileInfosChanged(value: profileInfoObject) {
    this.currentObject.profile = Object.assign(value);
    this.currentStep = 3;
  }
  onProfessionalInfosChanged(value: professionalInfosObject) {
    this.currentObject.professional = Object.assign(value);
    console.log(this.currentObject);
  }
  goBack(value) {
    if (this.currentStep == 1) {
      this.router.navigate(['provider']);
    } else {
      this.currentStep--;
    }
  }
}
