import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavItem } from '@se/shared/types/nav-item';
import { ProfileItem } from '@se/shared/types/profile-item';

@Component({
  selector: 'se-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  showProfileMenu: boolean = false;
  showMenu: boolean = false;
  navItems: NavItem[];
  profileItems: ProfileItem[];
  constructor(private ts: TranslateService) {
    this.navItems = [
      {
        name: 'HOME',
        active: true,
        to: '/'
      },
      {
        name: 'ARTICLES',
        active: false,
        to: '/articles'
      },
      {
        name: 'FORMATIONS',
        active: false,
        to: '/formations'
      },
      {
        name: 'ADVICES',
        active: false,
        to: '/advices'
      },
      {
        name: 'BECOME_PARTNER',
        active: false,
        to: '/start_partnership'
      },
      {
        name: 'LOGIN',
        active: false,
        to: '/login'
      }
    ];
    this.profileItems = [
      {
        name: 'PROFILE',
        to: '/Profile'
      },
      {
        name: 'SETTINGS',
        to: '/Setting'
      },
      {
        name: 'LOGOUT',
        to: '/Logout'
      }
    ];
    if (this.isAuthenticated) {
      this.navItems = this.navItems.filter((item) => item.name != 'LOGIN');
    }
  }
  setActive(index: number): void {
    this.navItems.forEach((item, ind) => {
      item.active = ind == index ? true : false;
    });
  }
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.header') as HTMLElement;
    if (window.pageYOffset > element.clientHeight + 10) {
      element.classList.add('header-scrolled');
    } else {
      element.classList.remove('header-scrolled');
    }
  }
}
