import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@se/core/services/auth.guard';
import { NotFoundComponent } from '@se/layout/not-found/not-found.component';
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
import { ArticlesComponent } from '@se/features/auth/views/articles/articles.component';
import { ArticleComponent } from '@se/features/auth/views/article/article.component';
import { ProviderComponent } from './components/provider/provider.component';

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
        path: 'course/:uuid',
        component: CourseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'article/:uuid',
        component: ArticleComponent
      },
      {
        path: 'become_provider',
        component: ProviderComponent
      }
    ]
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'articles',
    component: ArticlesComponent
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
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
