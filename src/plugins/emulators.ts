import { environment } from '@environments/environment';
import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';

export const emulatorProviders = [
  //Todo (zack) : Port emulator's URLs to env var
  //Pay heed to the inconsistency of the provided URL, this is due to angularfire v7 breaking changes
  //You can read more about it here : https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md
  {
    provide: USE_AUTH_EMULATOR,
    useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined
  },
  {
    provide: USE_FIRESTORE_EMULATOR,
    useValue: environment.useEmulators ? ['localhost', 8081] : undefined
  },
  {
    provide: USE_FUNCTIONS_EMULATOR,
    useValue: environment.useEmulators ? ['localhost', 5001] : undefined
  }
];
