export const environment = {
  production: true,
  firebase: {
    apiKey: process.env.SE_API_KEY,
    authDomain: process.env.SE_AUTH_DOMAIN,
    projectId: process.env.SE_PROJECT_ID,
    storageBucket: process.env.SE_STORAGE_BUCKET,
    messagingSenderId: process.env.SE_MESSAGING_SENDER_ID,
    appId: process.env.SE_APP_ID,
    measurementId: process.env.SE_MEASUREMENT_ID
  }
};
