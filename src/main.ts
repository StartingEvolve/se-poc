//Todo (zack) : Optimize the build (current : 985.kB -> target : 500kB)
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@se/app.module';
import { environment } from '@environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // eslint-disable-next-line no-undef
  .catch((err) => console.error(err));
