import { Component, Input } from '@angular/core';

export interface CourseData extends Highlighted {
  title: string;
  description: string;
  image: string;
  public?: string;
  newPrice?: string;
  price?: string;
  location?: string;
  isEligible?: boolean;
  duration?: string;
  deadline?: string;
  author?: string[];
  companyLogo?: string;
  rating?: number;
  ratersNumber?: number;
}

export interface Highlighted {
  _highlightResult?: {};
  label?: string;
  highlighted?: string;
}

@Component({
  selector: 'se-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() data: CourseData;

  constructor() {}
}
