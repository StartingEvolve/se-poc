import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './features/article/article.component';
import { ArticleprototypeComponent } from './prototype/articleprototype/articleprototype.component';
import { Example1Component } from './prototype/example1/example1.component';
import { Example2Component } from './prototype/example2/example2.component';
import { CarouselComponent } from '@se/prototype/carousel/carousel.component';
import { PrototypeComponent } from './prototype/prototype/prototype.component';

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
  { path: 'article', component: ArticleComponent },
  { path: 'article/:articleId', component: ArticleComponent },
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
