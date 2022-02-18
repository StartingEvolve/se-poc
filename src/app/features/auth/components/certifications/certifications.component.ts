import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'se-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent {
  @Input() data: any;
  constructor() {}
}
