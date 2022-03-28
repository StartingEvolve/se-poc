export const environment = {
  production: true,
  useEmulators: false,
  firebase: {
    apiKey: process.env.SE_API_KEY,
    authDomain: process.env.SE_AUTH_DOMAIN,
    projectId: process.env.SE_PROJECT_ID,
    storageBucket: process.env.SE_STORAGE_BUCKET,
    messagingSenderId: process.env.SE_MESSAGING_SENDER_ID,
    appId: process.env.SE_APP_ID,
    measurementId: process.env.SE_MEASUREMENT_ID
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
