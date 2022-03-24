import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ClearRefinementsComponent } from '@shared/components/search-ui/clear-refinements.component';
import { CourseCardComponent } from '@shared/components/search-ui/course-card.component';
import { PaginationComponent } from '@shared/components/search-ui/pagination.component';
import { RefinementListComponent } from '@shared/components/search-ui/refinement-list.component';
import { SearchAutocompleteBoxComponent } from '@shared/components/search-ui/search-autocomplete-box.component';
import { SearchBoxComponent } from '@shared/components/search-ui/searchbox.component';
import { NgAisModule } from 'angular-instantsearch';
import { HeadlessRefinementComponent } from '@shared/components/search-ui/headless-refinement.component';
import { CourseSearchUiComponent } from '@shared/components/search-ui/course-search-ui.component';
import { MultiSearchBoxComponent } from '@shared/components/search-ui/multi-search-box.component';
import { ArticleSearchUiComponent } from '@shared/components/search-ui/article-search-ui.component';
import { ArticleCardComponent } from '@shared/components/search-ui/article-card.component';

const components = [
  ClearRefinementsComponent,
  CourseCardComponent,
  ArticleCardComponent,
  PaginationComponent,
  RefinementListComponent,
  SearchAutocompleteBoxComponent,
  SearchBoxComponent,
  HeadlessRefinementComponent,
  MultiSearchBoxComponent,
  CourseSearchUiComponent,
  ArticleSearchUiComponent
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, SharedModule, NgAisModule],
  exports: [...components]
})
export class SearchUiModule {}
