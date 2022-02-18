import { Component } from '@angular/core';
import { CourseData } from '@core/store/course/search-courses.store';

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
