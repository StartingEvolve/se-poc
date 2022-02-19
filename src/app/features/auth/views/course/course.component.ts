import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseStore } from '@core/store/course/course.store';
import { CourseInfo } from '@core/services/course.service';
import { Subscription } from 'rxjs';

export interface Tab {
  id: number;
  title: string;
  image: string;
}

@Component({
  selector: 'se-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  uuid: string;
  activeTabId: number = 1;
  tabs: Tab[];
  courseInfo: CourseInfo;
  dummyCourse: CourseInfo;
  subs: Subscription[] = []; // You must initiate array in order to push

  constructor(private route: ActivatedRoute, private courseStore: CourseStore) {
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

  getTabId(id: number) {
    this.activeTabId = id;
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap.subscribe((paramMap) => {
        this.uuid = paramMap.get('uuid');
        this.courseStore.getCourseById(this.uuid);
        this.subs.push(
          this.courseStore.stateChanged.subscribe((value) => {
            console.log(value);
            this.courseInfo = value.course;
          })
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
