import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseStore } from '@core/store/course/course.store';
import { CourseInfo } from '@core/services/course.service';
import { Subscription } from 'rxjs';

export interface Tab {
  id: number;
  title: string;
  image: string;
}

// export interface CourseInfo {
//   uuid: string; // course uuid
//   title: string; // course title
//   image: string; // course image
//   description: string; // course description
//   category: string; // course Category
//   goals?: string[]; //course goals arrays
//   prerequisites?: string[]; //course prerequisite array
//   program?: string[]; // course program array
//   certifications?: {
//     uuid_ceritificate: string; // Certification uuid
//     image: string; // Certification image
//     name: string; // Certification name
//     description: string; // Certification description
//   }[];
//   overview?: {
//     article?: any; // course article to implement
//     public_admitted?: string[]; // public admitted by the course
//     price?: {
//       value: number; //price value
//       new_value?: number; //new value if there is a discount
//       currency: string; // Price currency
//     };
//     eligibility?: string; // eligibility to a foundation
//     start_date?: string; // Start date of course
//     location?: {
//       address?: string; // location exact address
//       region: string; // location region name
//       zip_code: string; // Location zip code
//     };
//     duration?: string; // course estimated duration
//     learning_mode?: string; //course leraning mode
//     success_rate?: string; //course success rate
//   };
//   organisation?: {
//     uuid_organisation: string; //organisation uuid
//     name?: string; //organisation name
//     image?: string; //organisation image
//   };
//   // Cloud function to do this and add some statistics (e.g: for each star number calculate the percentage of pepole )
//   reviews?: {
//     global_score: number; // reviews global score
//     total: number; // total reviews
//     per_page?: number; // number of reviews per page
//     current_page?: number; // current reviews page
//     last_page?: number; // reviews last page
//     next_page?: string; // reviews next page
//     prev_page?: string; // reviews previews page
//     from?: number; // from number
//     to?: number; // to number
//     data: {
//       uuid_user: string; //uuid user
//       full_name: string; // full name reviewer
//       score: number; // review score
//       review?: string;
//       date?: string; //review message optional
//     }[];
//   };
//   instructors?: {
//     uuid_instructor: string; //uuid instructor
//     full_name: string; // full name instructor
//     role_description: string; //role description
//     image?: string; //image description
//     top_instructor: boolean; //is top instructor
//   }[];
//   views?: { count: number; users?: any }; // Incremented once per each user (Queue)
// }

@Component({
  selector: 'se-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  uuid: string;
  activeTabId: number = 1;
  tabs: Tab[];
  courseInfo: CourseInfo;
  dummyCourse: CourseInfo;
  storeSub: Subscription;

  constructor(private route: ActivatedRoute, private courseStore: CourseStore) {
    // 'bank' is the name of the route parameter
    this.uuid = this.route.snapshot.params['uuid'];
    this.tabs = [
      {
        id: 1,
        title: 'Aperçu',
        image: 'overview.svg'
      },
      {
        id: 2,
        title: 'Objectifs',
        image: 'goals.svg'
      },
      {
        id: 3,
        title: 'Prérequis',
        image: 'prerequisites.svg'
      },
      {
        id: 4,
        title: 'Programme',
        image: 'program.svg'
      },
      {
        id: 5,
        title: 'Instructeurs',
        image: 'instructors.svg'
      },
      {
        id: 6,
        title: 'Certifications',
        image: 'certifications.svg'
      },
      {
        id: 7,
        title: 'Avis',
        image: 'reviews.svg'
      }
    ];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.uuid = paramMap.get('uuid');
      this.courseStore.getCourseById(this.uuid);
      this.storeSub = this.courseStore.stateChanged.subscribe((value) => {
        console.log(value);
        this.courseInfo = value.course;
      });
    });
  }

  getTabId(id: number) {
    this.activeTabId = id;
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
