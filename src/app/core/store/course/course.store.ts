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
  private courseSub: Subscription;
  private providerSub: Subscription;

  constructor(private courseService: CourseService) {
    super({ trackStateHistory: true, logStateChanges: true });

    const initialState = {};

    this.setState(initialState, CourseStoreActions.InitializeCourses);
  }

  getCourseById(id: string) {
    //Todo (zack): Handle cashed courses in the store
    this.courseSub = this.courseService
      .getCourseById(id)
      .subscribe((course) => {
        console.log(course);
        this.providerSub = this.courseService
          .getProviderById(course.providerId)
          .subscribe((provider) => {
            this.setState(
              { ...course, organisation: { ...provider } },
              CourseStoreActions.AddCourse
            );
            this.providerSub.unsubscribe();
          });
        //Getting Data only once
        this.courseSub.unsubscribe();
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
