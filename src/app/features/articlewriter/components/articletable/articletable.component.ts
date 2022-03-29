import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'se-articletable',
  templateUrl: './articletable.component.html',
  styleUrls: ['./articletable.component.scss']
})
export class ArticletableComponent {
  showProfileDropdown: boolean = false;
  openOptions: boolean = false;
  mobileSideShow: boolean = false;
  mobileProfileDrop: boolean = false;
  courseDropdown: boolean = false;
  courseDropdown2: boolean = false;

  toggleCourseDropdown(): void {
    this.courseDropdown = !this.courseDropdown;
    this.courseDropdown2 = false;
  }
  toggleCourseDropdown2(): void {
    this.courseDropdown2 = !this.courseDropdown2;
    this.courseDropdown = false;
  }
  toggleMobileProfileDrop(): void {
    this.mobileProfileDrop = !this.mobileProfileDrop;
  }
  toggleMobileSide(): void {
    this.mobileSideShow = !this.mobileSideShow;
  }
  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }
  toggleOptions(): void {
    this.openOptions = !this.openOptions;
  }
  closeDrop(): void {
    this.showProfileDropdown = false;
  }
  logout(): void {
    console.log('later');
  }
}
