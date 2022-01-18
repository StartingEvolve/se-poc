import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { SharedModule } from './shared/shared.module';
// import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CoreModule } from './core/core.module';
import firebase from 'firebase/compat';

//Todo (zack): Investigate why Webpack doesn't bind environment.ts
const firebase_init = {
  apiKey: process.env.SE_API_KEY,
  authDomain: process.env.SE_AUTH_DOMAIN,
  projectId: process.env.SE_PROJECT_ID,
  storageBucket: process.env.SE_STORAGE_BUCKET,
  messagingSenderId: process.env.SE_MESSAGING_SENDER_ID,
  appId: process.env.SE_APP_ID,
  measurementId: process.env.SE_MEASUREMENT_ID
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireModule.initializeApp(firebase_init),
    AngularFirestoreModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
