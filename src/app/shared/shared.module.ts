import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePickerWebComponent } from './components/language-picker-web/language-picker-web.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './components/stepper/stepper.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { SearchComponent } from './components/search/search.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
const components = [
  LanguagePickerWebComponent,
  StepperComponent,
  CarouselComponent,
  SearchComponent,
  PaginationComponent,
  DropdownComponent
];

@NgModule({
  declarations: [...components, TruncatePipe],
  imports: [
    CommonModule,
    MaterialUiModule,
    TranslateModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialUiModule,
    TranslateModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe,
    ...components
  ]
})
export class SharedModule {}
