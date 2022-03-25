import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { serviceAccount } from './serviceAccount';

// Emulation path : http://localhost:5001/angular-fire-e40b7/us-central1/main
// TODO (zack): Restructure the file hierarchy either by allowing a monorepo or multirepo structure
//Todo (zack): Add API authentication & rate limiting (follow best practices)

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, uuidv4, auth };
