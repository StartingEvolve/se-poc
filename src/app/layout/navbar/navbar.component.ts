import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class NavbarComponent implements OnInit {
  @Input() activeId: number;
  showProfileMenu: boolean;
  userState: UserInterface;
  showMenu: boolean = false;
  navItems: NavItem[];
  profileItems: ProfileItem[];
  constructor(
    private ts: TranslateService,
    private as: AuthService,
    private aStore: AuthStore,
    private router: Router
  ) {
    this.showProfileMenu = false;
    this.showMenu = false;
    this.aStore.stateChanged.subscribe((state) => {
      if (state) {
        this.userState = state;
      }
    });
  }
  setActive(index: number, to: string): void {
    this.navItems.forEach((item, ind) => {
      item.active = ind == index;
    });
    this.showProfileMenu = false;
    this.showMenu = false;
    window.scrollTo(0, 0);
    this.router.navigate([to]);
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
  setActiveProfileItem(index: number): void {
    if (this.profileItems[index].name == 'LOGOUT') {
      this.toggleMenu();
      this.toggleProfileMenu();
      this.as.logoutUser();
    } else if (this.profileItems[index].name == 'PROFILE') {
      this.toggleMenu();
      this.toggleProfileMenu();
      this.router.navigate(['profile']);
    }
  }
  ngOnInit(): void {
    //Variables that depend on input must be initialized on the Init lifecycle hook
    this.navItems = [
      {
        name: 'HOME',
        active: this.activeId == 0,
        to: '/'
      },
      {
        name: 'ARTICLES',
        active: this.activeId == 1,
        to: '/articles'
      },
      {
        name: 'FORMATIONS',
        active: this.activeId == 2,
        to: '/courses'
      },
      {
        name: 'BECOME_PARTNER',
        active: this.activeId == 3,
        to: '/become_provider'
      }
    ];
    this.profileItems = [
      {
        name: 'PROFILE',
        to: '/profile'
      },
      {
        name: 'SETTINGS',
        to: '/petting'
      },
      {
        name: 'LOGOUT',
        to: '/logout'
      }
    ];
  }
}
