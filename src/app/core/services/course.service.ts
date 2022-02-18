import { Injectable } from '@angular/core';
import { DatabaseSerice } from '@core/adapters/database/database';
import { Observable } from 'rxjs';

export interface CourseInfo {
  uuid: string; // course uuid
  title: string; // course title
  image: string; // course image
  description: string; // course description
  goals?: string[]; //course goals arrays
  prerequisites: string[]; //course prerequisite array
  program: string[]; // course program array
  category: string;
  certifications: {
    uuid_ceritificate: string; // Certification uuid
    image: string; // Certification image
    name: string; // Certification name
    description: string;
  }[];
  overview?: {
    article: any; // course article to implement
    public_admitted?: string[];
    price?: {
      value: number;
      new_value?: number;
      currency: string;
    };
    eligibility?: string;
    start_date?: string; //We're going to deal with Date formatting later
    location?: {
      address?: string;
      region: string;
      zipCode: string;
    };
    duration?: string;
    learning_mode?: string;
    success_rate?: string;
  };
  organisation?: {
    uuid_organisation: string;
    name?: string;
    image?: string;
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
  instructors: {
    uuid_instructor: string;
    full_name: string;
    image?: string;
    top_instructor: boolean;
    role_description: string;
  }[];
  views?: { count: number; users?: any }; // Incremented once per each user (Queue)
}

@Injectable({
  providedIn: 'root'
})
//Todo (zack) : find a way to avoid firestore listeners while using AngularFire API
//See more: https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
//https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
export class CourseService {
  constructor(private db: DatabaseSerice) {}

  getCourseById(id: string): Observable<any> {
    return this.db
      .getDatabase()
      .doc('courses_info/' + id)
      .valueChanges();
  }
}
