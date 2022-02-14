import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';
import { NavItem } from '@se/shared/types/nav-item';
import { ProfileItem } from '@se/shared/types/profile-item';

@Component({
  selector: 'se-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showProfileMenu: boolean;
  userState: UserInterface;
  showMenu: boolean = false;
  navItems: NavItem[];
  profileItems: ProfileItem[];
  constructor(
    private ts: TranslateService,
    private as: AuthService,
    private aStore: AuthStore
  ) {
    this.showProfileMenu = false;
    this.showMenu = false;
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
        to: '/courses'
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
    this.aStore.stateChanged.subscribe((state) => {
      this.userState = state;
    });
  }
  setActive(index: number): void {
    this.navItems.forEach((item, ind) => {
      item.active = ind == index;
    });
    this.showProfileMenu = false;
    this.showMenu = false;
    window.scrollTo(0, 0);
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
    if (window.pageYOffset > element.clientHeight / 2.0) {
      element.classList.add('header-scrolled');
    } else {
      element.classList.remove('header-scrolled');
    }
  }
  logout(index: number): void {
    if (this.profileItems[index].name == 'LOGOUT') {
      this.toggleMenu();
      this.toggleProfileMenu();
      this.as.logoutUser();
    }
  }
}
