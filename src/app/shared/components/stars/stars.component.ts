import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'se-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @Input() note: number;
  constructor() {}
}
