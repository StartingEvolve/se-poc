import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';

export interface SearchCourses {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page?: string;
  prev_page?: string;
  from: number;
  to: number;
  data: CourseData[];
}
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
  author?: string[];
  companyLogo?: string;
  rating?: number;
  ratersNumber?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchCoursesStore extends ObservableStore<SearchCourses> {
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    const initialState = {
      total: 102,
      per_page: 10,
      current_page: 5,
      last_page: 10,
      next_page: 'page=2',
      prev_page: null,
      from: 1,
      to: 10,
      data: []
    };
    this.setState(initialState, SearchCoursesStoreActions.InitializeState);
  }
}
export enum SearchCoursesStoreActions {
  InitializeState = 'Initialize state',
  ChangeState = 'Change state message to bruh'
}
