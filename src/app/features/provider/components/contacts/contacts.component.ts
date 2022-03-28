import { Component } from '@angular/core';

@Component({
  selector: 'se-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
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
