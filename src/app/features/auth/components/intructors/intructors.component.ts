import { Component, Input } from '@angular/core';

@Component({
  selector: 'se-intructors',
  templateUrl: './intructors.component.html',
  styleUrls: ['./intructors.component.scss']
})
export class IntructorsComponent {
  @Input() data: any;
  constructor() {}
}
