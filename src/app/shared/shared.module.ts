import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePickerWebComponent } from './components/language-picker-web/language-picker-web.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const components = [LanguagePickerWebComponent];
@NgModule({
  declarations: [components],
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
    ...components
  ]
})
export class SharedModule {}
