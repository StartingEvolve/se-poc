import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'se-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {
  @Input() data: any;
  constructor() {}
}
