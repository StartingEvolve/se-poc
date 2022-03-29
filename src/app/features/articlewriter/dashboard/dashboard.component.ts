import { Component, OnInit } from '@angular/core';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';
import { Router } from '@angular/router';

export interface DropdownItem {
  name: string;
  to: string;
}
export interface SidebarItem {
  name: string;
  active: boolean;
  icon: string;
  to: number;
}

const ProfileDropItems: DropdownItem[] = [
  { name: 'Profile', to: '/profile' },
  { name: 'Paramètres', to: '/settings' }
];
const SidebarItems: SidebarItem[] = [
  {
    name: 'Mes articles',
    active: true,
    icon: 'article',
    to: 1
  },
  { name: 'Création', active: false, icon: 'edit', to: 2 }
];

@Component({
  selector: 'se-dashboard2',
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
  currentPage: number = 1;
  userState: UserInterface;

  constructor(
    private as: AuthService,
    private aStore: AuthStore,
    private router: Router
  ) {
    this.aStore.stateChanged.subscribe((state) => {
      if (state) {
        this.userState = state;
        console.log(state);
      }
    });
  }

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
    this.as.logoutUser();
  }
  togglePage(num: number) {
    this.currentPage = num;
    for (let e of this.sidebarItems) {
      e.active = false;
    }
    this.sidebarItems[num - 1].active = true;
  }
}
