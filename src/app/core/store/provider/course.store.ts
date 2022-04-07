import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { CourseService } from '@core/services/course.service';
import { Subscription } from 'rxjs';

interface Course {
  id: string; // course uuid
  providerId: string;
  title: string; // course title
  image: string; // course image
  // description: string; // course description
  goals?: string[]; //course goals arrays
  prerequisites: string[]; //course prerequisite array
  program: string[]; // course program array
  category: string;
  status: string; // can be draft | accepted | rejected | pending
  createdAt: string;
  submittedAt: string;
  rejectionReason: string;
  // certifications: {
  //   // certificateId: string; // Certification uuid
  //   image: string; // Certification image
  //   // name: string; // Certification name
  //   // description: string;
  // }[];
  overview?: {
    article: any; // course article to implement
    public_admitted?: string[];
    price?: {
      value: number;
      new_value?: number;
      currency: string;
    };
    eligibility?: string[];
    start_date?: string; //We're going to deal with Date formatting later
    location?: {
      address?: string[];
      region: string;
      zipCode: string;
    };
    duration?: string;
    learning_mode?: string[];
    success_rate?: string;
  };
  reviews?: {
    global_score: number;
    total: number;
    date: string;
    data: {
      uuid_user: string;
      full_name: string;
      score: number;
      review?: string;
    }[];
  };
  // instructors: {
  //   // instructorId: string;
  //   full_name: string;
  //   image?: string;
  //   top_instructor: boolean;
  //   role_description: string;
  // }[];
  // views?: { count: number; users?: any }; // Incremented once per each user (Queue)
}

export interface CourseState {
  // courses: CourseInfo[];
  course: Course;
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

  backup(courseChunk: any) {
    let course = this.getState();
    for (let [key, _] of Object.entries(course)) {
      if (key in courseChunk) {
        course[key] = courseChunk[key];
      }
    }
    console.log(course);
    this.setState(course, CourseStoreActions.UpdateCourse);
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

  updateCourse(course: Course) {
    this.setState({}, CourseStoreActions.UpdateCourse);
  }
}

export enum CourseStoreActions {
  InitializeCourses = 'INITIALIZE_COURSE_STORE',
  AddCourse = 'ADD_COURSE',
  UpdateCourse = 'UPDATE_COURSE'
}
