import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'se-navbar-provider',
  templateUrl: './navbar-provider.component.html',
  styleUrls: ['./navbar-provider.component.scss']
})
export class NavbarProviderComponent {
  @Input() isExit: boolean;
  @Output() goBackEvent = new EventEmitter();
  constructor() {}
  goBack() {
    this.goBackEvent.emit();
  }
}
