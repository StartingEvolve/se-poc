import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'se-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.scss']
})
export class PrestationsComponent {
  openOptions: boolean = false;
  courseDropdown: boolean = false;
  courseDropdown2: boolean = false;

  constructor() {}
  toggleOptions(): void {
    this.openOptions = !this.openOptions;
  }
  toggleCourseDropdown(): void {
    this.courseDropdown = !this.courseDropdown;
    this.courseDropdown2 = false;
  }
  toggleCourseDropdown2(): void {
    this.courseDropdown2 = !this.courseDropdown2;
    this.courseDropdown = false;
  }
}
