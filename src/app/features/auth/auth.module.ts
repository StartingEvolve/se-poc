import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@se/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule]
})
export class AuthModule {}
