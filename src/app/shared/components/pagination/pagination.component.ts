import { Component, Input } from '@angular/core';
import {
  SearchCourses,
  SearchCoursesStore
} from '@se/core/store/search-course/search-courses.store';

export interface PaginationData {
  current_page: number;
  from: number;
  last_page: number;
  last_page_url: string;
  to: number;
}

@Component({
  selector: 'se-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() data: PaginationData;
  scState: SearchCourses;

  constructor(private scStore: SearchCoursesStore) {
    this.scStore.stateChanged.subscribe((state) => {
      this.scState = state;
    });
  }

  prev() {}

  next() {}

  goto(i: number) {
    console.log(i);
  }
}
