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

@NgModule({
  declarations: [
    LandingPageComponent,
    AuthComponent,
    SigninComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignupComponent,
    DashboardComponent
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule, LayoutModule]
})
export class AuthModule {}