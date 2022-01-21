import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePickerWebComponent } from './components/language-picker-web/language-picker-web.component';

@NgModule({
  declarations: [LanguagePickerWebComponent],
  imports: [CommonModule, MaterialUiModule],
  exports: [MaterialUiModule, TranslateModule, LanguagePickerWebComponent]
})
export class SharedModule {}
