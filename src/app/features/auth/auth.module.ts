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
import { CoursesComponent } from './views/courses/courses.component';
import { ArticleCarouselComponent } from './components/article-carousel/article-carousel.component';
import { ArticleCarouselItemComponent } from './components/article-carousel-item/article-carousel-item.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseComponent } from './views/course/course.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { OverviewComponent } from './components/overview/overview.component';
import { IntructorsComponent } from './components/intructors/intructors.component';
import { GoalsComponent } from './components/goals/goals.component';
import { PrerequisitesComponent } from './components/prerequisites/prerequisites.component';
import { ProgramComponent } from './components/program/program.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { SearchUiModule } from '@shared/components/search-ui/search-ui.module';
import { ProfileComponent } from './views/profile/profile.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    AuthComponent,
    SigninComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignupComponent,
    DashboardComponent,
    CoursesComponent,
    ArticleCarouselComponent,
    ArticleCarouselItemComponent,
    CoursesComponent,
    CourseCardComponent,
    CourseComponent,
    ReviewsComponent,
    OverviewComponent,
    IntructorsComponent,
    GoalsComponent,
    PrerequisitesComponent,
    ProgramComponent,
    CertificationsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    LayoutModule,
    SearchUiModule
  ]
})
export class AuthModule {}
