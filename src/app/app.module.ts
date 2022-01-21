import { environment } from '@environments/environment';
import { emulatorProviders } from '@plugins/emulators';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FeatureExampleModule } from './features/feature-example/feature-example.module';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PrototypeComponent } from './prototype/prototype/prototype.component';
import { Example1Component } from './prototype/example1/example1.component';
import { Example2Component } from './prototype/example2/example2.component';
import { MatPaginatorModule } from '@angular/material/paginator';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PrototypeComponent,
    Example1Component,
    Example2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    //Todo (zack): Migrate to AngularFire v7 with modular API
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FeatureExampleModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [...emulatorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
