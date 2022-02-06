import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@se/shared/shared.module';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { LayoutModule } from '@se/layout/layout.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './views/signin/signin.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './views/verify-email/verify-email.component';
import { SignupComponent } from './views/signup/signup.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ArticleCarouselComponent } from './components/article-carousel/article-carousel.component';
import { ArticleCarouselItemComponent } from './components/article-carousel-item/article-carousel-item.component';
import { CoursesComponent } from './views/courses/courses.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    AuthComponent,
    SigninComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignupComponent,
    DashboardComponent,
    ArticleCarouselComponent,
    ArticleCarouselItemComponent,
    CoursesComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, LayoutModule]
})
export class AuthModule {}
