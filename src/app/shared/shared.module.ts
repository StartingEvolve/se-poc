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
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LogPipe } from './pipes/log.pipe';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { StarsComponent } from './components/stars/stars.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

const components = [
  LanguagePickerWebComponent,
  StepperComponent,
  CarouselComponent,
  SearchComponent,
  PaginationComponent,
  DropdownComponent,
  BreadcrumbsComponent,
  StarsComponent,
  TabComponent,
  ChatbotComponent,
  TabsComponent
];

const pipes = [TruncatePipe, LogPipe, SanitizeHtmlPipe];

@NgModule({
  declarations: [...components, ...pipes, ChatbotComponent],
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
    ...pipes,
    ...components
  ]
})
export class SharedModule {}
