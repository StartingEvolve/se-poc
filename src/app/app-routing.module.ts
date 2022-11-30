import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleprototypeComponent } from './prototype/articleprototype/articleprototype.component';
import { Example1Component } from './prototype/example1/example1.component';
import { Example2Component } from './prototype/example2/example2.component';
import { CarouselComponent } from '@se/prototype/carousel/carousel.component';
import { PrototypeComponent } from './prototype/prototype/prototype.component';
import { MultiSearchBoxComponent } from '@se/prototype/multi-search-box/multi-search-box.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'prototype',
    component: PrototypeComponent
  },
  { path: 'prototype/example1', component: Example1Component },
  { path: 'prototype/example2', component: Example2Component },
  { path: 'prototype/carousel', component: CarouselComponent },
  // { path: 'prototype/search', component: CourseSearchUiComponent },
  { path: 'prototype/articleproto', component: ArticleprototypeComponent },
  { path: 'prototype/multisearch', component: MultiSearchBoxComponent },
  {
    path: 'test',
    loadChildren: () =>
      import('./features/feature-example/feature-example.module').then(
        (m) => m.FeatureExampleModule
      )
  },
  {
    path: 'provider',
    loadChildren: () =>
      import('./features/provider/provider.module').then(
        (m) => m.ProviderModule
      )
  },
  {
    path: 'articlewriter',
    loadChildren: () =>
      import('./features/articlewriter/articlewriter.module').then(
        (m) => m.ArticlewriterModule
      )
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
