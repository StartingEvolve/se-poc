import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './features/article/article.component';
import { Example1Component } from './prototype/example1/example1.component';
import { Example2Component } from './prototype/example2/example2.component';
import { PrototypeComponent } from './prototype/prototype/prototype.component';

const routes: Routes = [
  { path: 'article', component: ArticleComponent },
  {
    path: 'test',
    loadChildren: () =>
      import('./features/feature-example/feature-example.module').then(
        (m) => m.FeatureExampleModule
      )
  },
  {
    path: 'prototype',
    component: PrototypeComponent
  },
  { path: 'prototype/example1', component: Example1Component },
  { path: 'prototype/example2', component: Example2Component },
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
