import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@se/shared/shared.module';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { LayoutModule } from '@se/layout/layout.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './views/signin/signin.component';

@NgModule({
  declarations: [LandingPageComponent, AuthComponent, SigninComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, LayoutModule]
})
export class AuthModule {}
