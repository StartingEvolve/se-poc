export const environment = {
  production: true,
  useEmulators: false,
  // firebase: {
  //   apiKey: process.env.SE_API_KEY,
  //   authDomain: process.env.SE_AUTH_DOMAIN,
  //   projectId: process.env.SE_PROJECT_ID,
  //   storageBucket: process.env.SE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.SE_MESSAGING_SENDER_ID,
  //   appId: process.env.SE_APP_ID,
  //   measurementId: process.env.SE_MEASUREMENT_ID
  // },
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
    apiKey: 'NaHIHgn2g1D9PtUTIEG6L5qNs6tsfwBK',
    host: '6ve2qm9cwxt7ka0hp-1.a1.typesense.net',
    protocol: 'https',
    port: '443'
  },
  adminAPI: {
    BASE_URL: 'https://us-central1-angular-fire-e40b7.cloudfunctions.net/api'
  }
};
