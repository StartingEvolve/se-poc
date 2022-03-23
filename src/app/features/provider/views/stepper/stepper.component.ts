import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { accountInfosObject } from '../../components/account_informations/account_informations.component';
import { organisationInfosObject } from '../../components/organisation-informations/organisation-informations.component';
import { professionalInfosObject } from '../../components/professional-informations/professional-informations.component';
import { profileInfoObject } from '../../components/profile-informations/profile-informations.component';
export interface completeObject {
  account?: accountInfosObject;
  profile?: profileInfoObject;
  professional?: professionalInfosObject;
  organisation?: organisationInfosObject;
}

@Component({
  selector: 'se-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  isOrganisation: boolean;
  steps: string[];
  currentStep: number = 1;
  currentObject: completeObject;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentObject = {};
    this.route.queryParams.subscribe((params) => {
      this.isOrganisation = params.isOrganisation === 'true';
      console.log(this.isOrganisation);
      this.steps = [
        'Informations de compte',
        'Informations personnelles',
        'Informations professionnelles'
      ];
      this.isOrganisation
        ? (this.steps[1] = "Informations de l'organisation")
        : '';
    });
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
    this.router.navigate(['provider', 'verify']);
  }
  onOrganisationInfosChanged(value: organisationInfosObject) {
    this.currentObject.organisation = Object.assign(value);
    this.currentStep = 3;
  }
  goBack(value) {
    if (this.currentStep == 1) {
      this.router.navigate(['provider']);
    } else {
      this.currentStep--;
    }
  }
}
