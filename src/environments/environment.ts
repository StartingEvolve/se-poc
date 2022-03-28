// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface Environment {
  production: boolean;
  useEmulators: boolean;
  firebase: any;
  typesense: {
    apiKey: string;
    host: string;
    protocol: 'http' | 'https';
    port: string;
  };
  adminAPI: any;
}

export const environment: Environment = {
  production: false,
  useEmulators: false,
  firebase: {
    apiKey: 'AIzaSyC3aZjZB-XU6OE39sdfQXY7MMCydj6MXBU',
    authDomain: 'angular-fire-e40b7.firebaseapp.com',
    projectId: 'angular-fire-e40b7',
    storageBucket: 'angular-fire-e40b7.appspot.com',
    messagingSenderId: '71305995040',
    appId: '1:71305995040:web:d40f052ff72ad77f99ed45',
    measurementId: 'G-TKQGYQVF4S'
  },
  typesense: {
    apiKey: '8SCbUB6OwcorefYh114fsK1PtTn9OO50',
    host: 'search.startingevolve.tech',
    protocol: 'https',
    port: '443'
  },
  adminAPI: {
    BASE_URL: 'https://us-central1-angular-fire-e40b7.cloudfunctions.net/api'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
