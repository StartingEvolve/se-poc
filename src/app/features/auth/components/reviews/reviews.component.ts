import { Component, Input } from '@angular/core';

@Component({
  selector: 'se-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() data: any;
  constructor() {}
}
