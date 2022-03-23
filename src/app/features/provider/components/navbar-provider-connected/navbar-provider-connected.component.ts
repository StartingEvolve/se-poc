import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'se-navbar-provider-connected',
  templateUrl: './navbar-provider-connected.component.html',
  styleUrls: ['./navbar-provider-connected.component.scss']
})
export class NavbarProviderConnectedComponent {
  @Input() isExit: boolean;
  @Output() goBackEvent = new EventEmitter();
  constructor() {}
  goBack() {
    this.goBackEvent.emit();
  }
}
