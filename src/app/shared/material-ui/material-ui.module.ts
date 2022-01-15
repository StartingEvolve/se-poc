import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
const materials = [
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [materials],
  exports: [materials]
})
export class MaterialUiModule { }
