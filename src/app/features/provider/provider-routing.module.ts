import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentityComponent } from './views/identity/identity.component';
import { ProviderComponent } from './provider.component';
import { StepperComponent } from './views/stepper/stepper.component';
import { CoursesComponent } from './views/course/course.component';

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
        path: 'course',
        component: CoursesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule {}
