import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'se-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.scss']
})
export class PrerequisitesComponent {
  @Input() data: any;
  constructor() {}
}
