import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialUiModule
  ],
  exports: [
    MaterialUiModule
  ]
})
export class SharedModule { }
