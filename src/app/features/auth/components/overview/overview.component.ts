import { Component, Input } from '@angular/core';

@Component({
  selector: 'se-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() data: any;
  @Input() description: any;

  constructor() {}
}
