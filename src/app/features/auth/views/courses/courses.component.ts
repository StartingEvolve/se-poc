import { Component } from '@angular/core';

//Todo (zack) Refactor Course Data model later
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
  selector: 'se-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: CourseData[];
  routeId: number = 2;
  courseInfo: any;

  constructor() {}
}
