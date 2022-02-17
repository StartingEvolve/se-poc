import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CourseComponent implements OnInit {
  uuid: string;
  activeTabId: number = 1;
  tabs: Tab[];
  constructor(private route: ActivatedRoute) {
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
    });
  }
  getTabId(id: number) {
    this.activeTabId = id;
  }
}
