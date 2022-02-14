import { Component, Input, OnInit } from '@angular/core';
import { CourseData } from '@se/core/store/search-course/search-courses.store';

@Component({
  selector: 'se-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() data: CourseData;
  constructor() {}
}
