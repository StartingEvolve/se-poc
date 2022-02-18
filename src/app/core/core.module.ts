import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestStore } from './store/test/test.store';
import { AuthStore } from './store/auth/auth.store';
import { VendorStore } from './store/vendor/vendor.store';
import { FilterStore } from '@core/store/filter/filter.store';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [TestStore, AuthStore, VendorStore, FilterStore]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
