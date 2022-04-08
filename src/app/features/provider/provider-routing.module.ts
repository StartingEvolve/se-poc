import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentityComponent } from './views/identity/identity.component';
import { ProviderComponent } from './provider.component';
import { StepperComponent } from './views/stepper/stepper.component';
import { CoursesComponent } from './views/course/course.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateStepperComponent } from './views/create-stepper/create-stepper.component';
import { LandingComponent } from './views/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: ProviderComponent,
    children: [
      {
        path: '',
        component: IdentityComponent
      },
      {
        path: 'stepper',
        component: StepperComponent
      },
      {
        path: 'create',
        component: CreateStepperComponent
      },
      {
        path: 'course',
        component: CoursesComponent
      },
      {
        path: 'verify',
        component: VerifyEmailComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'landing',
        component: LandingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {}
