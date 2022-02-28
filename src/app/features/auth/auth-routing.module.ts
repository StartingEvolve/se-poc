import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@se/core/services/auth.guard';
import { AuthComponent } from './auth.component';
import { CourseComponent } from './views/course/course.component';
import { CoursesComponent } from './views/courses/courses.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent
      },
      {
        path: 'articles',
        component: SignupComponent
      },
      {
        path: 'course/:uuid',
        component: CourseComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: '**',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
