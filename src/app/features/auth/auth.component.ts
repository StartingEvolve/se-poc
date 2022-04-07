import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'se-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  activeId: number = 0;
  constructor(private router: Router) {
    switch (this.router.url) {
      case '/articles':
        this.activeId = 1;
        break;
      case '/become_provider':
        this.activeId = 3;
        break;
      default:
        this.activeId = -1;
        break;
    }
  }
}
