import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const materials = [
  MatInputModule,
  MatButtonModule,
  MatSliderModule,
  MatIconModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressBarModule
];

@NgModule({
  declarations: [],
  imports: [...materials],
  exports: [...materials]
})
export class MaterialUiModule {}
