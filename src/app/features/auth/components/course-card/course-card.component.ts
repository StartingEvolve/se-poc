import { Component, Input, OnInit } from '@angular/core';

export interface CourseData {
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
