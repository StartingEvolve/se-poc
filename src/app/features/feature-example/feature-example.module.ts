import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureExampleRoutingModule } from './feature-example-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TestComponent } from './views/test/test.component';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, FeatureExampleRoutingModule, SharedModule]
})
export class FeatureExampleModule {
  constructor() {}
}
