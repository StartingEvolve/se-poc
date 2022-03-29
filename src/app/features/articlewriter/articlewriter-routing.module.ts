import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlewriterComponent } from './articlewriter.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlewriterComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlewriterRoutingModule {}
