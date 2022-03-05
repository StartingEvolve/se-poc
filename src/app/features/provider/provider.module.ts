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

@NgModule({
  declarations: [
    NavbarProviderComponent,
    StepperComponent,
    ProviderComponent,
    IdentityComponent,
    AccountInformationComponent,
    ProfileInformationsComponent,
    ProfessionalInformationsComponent
  ],
  imports: [CommonModule, ProviderRoutingModule, SharedModule, LayoutModule]
})
export class ProviderModule {}
