import { Component, OnInit } from '@angular/core';

export interface DropdownItem {
  name: string;
  to: string;
}
export interface SidebarItem {
  name: string;
  active: boolean;
  icon: string;
  to: string;
}

const ProfileDropItems: DropdownItem[] = [
  { name: 'Profile', to: '/profile' },
  { name: 'Paramètres', to: '/settings' }
];
const SidebarItems: SidebarItem[] = [
  {
    name: 'Mes prestations',
    active: true,
    icon: 'work_outline',
    to: '/prestation'
  },
  { name: 'Contacts', active: false, icon: 'mail_outline', to: '/contact' },
  {
    name: 'Statistiques',
    active: false,
    icon: 'signal_cellular_alt',
    to: '/stats'
  }
];

@Component({
  selector: 'se-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showProfileDropdown: boolean = false;
  profileDrop: DropdownItem[] = ProfileDropItems;
  sidebarItems: SidebarItem[] = SidebarItems;
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
