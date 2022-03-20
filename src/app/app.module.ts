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
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FeatureExampleModule } from './features/feature-example/feature-example.module';
import { LayoutModule } from '@layout/layout.module';
import { MatTableModule } from '@angular/material/table';
import { NgAisModule } from 'angular-instantsearch';

import { PrototypeComponent } from './prototype/prototype/prototype.component';
import { Example1Component } from './prototype/example1/example1.component';
import { Example2Component } from './prototype/example2/example2.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InterceptorService } from '@core/services/interceptor.service';
import { ArticleComponent } from './features/article/article.component';
import { ArticleprototypeComponent } from './prototype/articleprototype/articleprototype.component';
import { CarouselComponent } from './prototype/carousel/carousel.component';
import { MultiSearchBoxComponent } from './prototype/multi-search-box/multi-search-box.component';
import { QuillModule } from 'ngx-quill';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PrototypeComponent,
    Example1Component,
    Example2Component,
    ArticleComponent,
    ArticleprototypeComponent,
    CarouselComponent,
    MultiSearchBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    LayoutModule,
    MatTableModule,
    //Todo (zack): Migrate to AngularFire v7 with modular API
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    FeatureExampleModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
      registrationStrategy: 'registerImmediately'
    }),
    NgAisModule.forRoot(),
    QuillModule.forRoot({
      customOptions: [
        {
          import: 'formats/font',
          whitelist: [
            'mirza',
            'roboto',
            'aref',
            'serif',
            'sansserif',
            'monospace'
          ]
        }
      ]
    })
  ],
  providers: [
    ...emulatorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  exports: [MultiSearchBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
