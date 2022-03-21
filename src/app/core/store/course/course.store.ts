import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { CourseInfo, CourseService } from '@core/services/course.service';
import { Subscription } from 'rxjs';

export interface CourseState {
  // courses: CourseInfo[];
  course: CourseInfo;
}

@Injectable({
  providedIn: 'root'
})
export class CourseStore extends ObservableStore<CourseState> {
  private storeSub: Subscription;

  constructor(private courseService: CourseService) {
    super({ trackStateHistory: true, logStateChanges: true });

    const initialState = {};

    this.setState(initialState, CourseStoreActions.InitializeCourses);
  }

  getCourseById(id: string) {
    //Todo (zack): Handle cashed courses in the store
    this.storeSub = this.courseService.getCourseById(id).subscribe((course) => {
      console.log(course);
      this.setState({ course }, CourseStoreActions.AddCourse);
      //Getting Data only once
      this.storeSub.unsubscribe();
    });
  }

  updateCourse(course: CourseInfo) {
    this.setState({}, CourseStoreActions.UpdateCourse);
  }
}

export enum CourseStoreActions {
  InitializeCourses = 'INITIALIZE_COURSE_STORE',
  AddCourse = 'ADD_COURSE',
  UpdateCourse = 'UPDATE_COURSE'
}
