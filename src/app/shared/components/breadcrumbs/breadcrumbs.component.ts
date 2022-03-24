import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'se-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() links: { name: string; url: string; category?: string }[];
  @Input() type: string;

  constructor() {}
}
