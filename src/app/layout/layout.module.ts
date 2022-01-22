import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '@se/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
const components = [NavbarComponent, FooterComponent];
@NgModule({
  declarations: [components],
  imports: [CommonModule, SharedModule],
  exports: [components]
})
export class LayoutModule {}
