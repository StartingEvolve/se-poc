import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { SharedModule } from '@se/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarProviderComponent } from './components/navbar-provider/navbar-provider.component';
import { StepperComponent } from './views/stepper/stepper.component';
import { ProviderComponent } from './provider.component';
import { IdentityComponent } from './views/identity/identity.component';
import { AccountInformationComponent } from './components/account_informations/account_informations.component';
import { ProfileInformationsComponent } from './components/profile-informations/profile-informations.component';
import { ProfessionalInformationsComponent } from './components/professional-informations/professional-informations.component';
import { CoursesComponent } from './views/course/course.component';
import { GeneralInformationsComponent } from './components/general-informations/general-informations.component';
import { GoalsComponent } from './components/goals/goals.component';
import { QuillModule } from 'ngx-quill';
import { OrganisationInformationsComponent } from './components/organisation-informations/organisation-informations.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';
import { ProgramComponent } from './components/program/program.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateStepperComponent } from './views/create-stepper/create-stepper.component';
import { NavbarProviderConnectedComponent } from './components/navbar-provider-connected/navbar-provider-connected.component';
import { TitleComponent } from './components/title/title.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
import { PrestationsComponent } from './components/prestations/prestations.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    NavbarProviderComponent,
    StepperComponent,
    ProviderComponent,
    IdentityComponent,
    AccountInformationComponent,
    ProfileInformationsComponent,
    ProfessionalInformationsComponent,
    CoursesComponent,
    GeneralInformationsComponent,
    GoalsComponent,
    OrganisationInformationsComponent,
    VerifyEmailComponent,
    ProgramComponent,
    DashboardComponent,
    CreateStepperComponent,
    NavbarProviderConnectedComponent,
    TitleComponent,
    CategoryComponent,
    DetailsComponent,
    PrestationsComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule,
    LayoutModule,
    QuillModule
  ]
})
export class ProviderModule {}
