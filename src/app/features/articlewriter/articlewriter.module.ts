import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlewriterRoutingModule } from './articlewriter-routing.module';
import { ArticlewriterComponent } from './articlewriter.component';
import { SharedModule } from '@se/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { QuillModule } from 'ngx-quill';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticletableComponent } from './components/articletable/articletable.component';
import { ArticlecreationComponent } from './components/articlecreation/articlecreation.component';

@NgModule({
  declarations: [
    ArticlewriterComponent,
    DashboardComponent,
    ArticletableComponent,
    ArticlecreationComponent
  ],
  imports: [
    CommonModule,
    ArticlewriterRoutingModule,
    CommonModule,
    SharedModule,
    LayoutModule,
    QuillModule
  ]
})
export class ArticlewriterModule {}
