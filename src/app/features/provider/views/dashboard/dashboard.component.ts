import { Component, OnInit } from '@angular/core';

export interface DropdownItem {
  name: string;
  to: string;
}
export interface SidebarItem {
  id: number;
  name: string;
  icon: string;
}

const ProfileDropItems: DropdownItem[] = [
  { name: 'Profile', to: '/profile' },
  { name: 'Paramètres', to: '/settings' }
];

@Component({
  selector: 'se-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showProfileDropdown: boolean = false;
  profileDrop: DropdownItem[] = ProfileDropItems;
  sidebarItems: SidebarItem[];
  mobileSideShow: boolean = false;
  mobileProfileDrop: boolean = false;
  activeId: number;
  constructor() {
    this.activeId = 1;
    this.sidebarItems = [
      {
        id: 1,
        name: 'Mes formations',
        icon: 'formation.svg'
      },
      {
        id: 2,
        name: 'Mes contacts',
        icon: 'contact.svg'
      }
    ];
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

  closeDrop(): void {
    this.showProfileDropdown = false;
  }
  logout(): void {
    console.log('later');
  }
  selectItem(id: number): void {
    this.activeId = id;
  }
}
