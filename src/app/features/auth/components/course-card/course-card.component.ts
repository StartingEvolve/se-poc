import { Component, Input } from '@angular/core';
import { CourseData } from '@core/store/course/search-courses.store';

@Component({
  selector: 'se-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() data: CourseData;

  constructor() {}
}
