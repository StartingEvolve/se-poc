import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'se-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {
  @Input() data: any;
  constructor() {}
}
