import { Component, Input } from '@angular/core';

@Component({
  selector: 'se-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() title: string;
  @Input() image: string;
  @Input() id: number;
  @Input() active = false;
  constructor() {}
}
