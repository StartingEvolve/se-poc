import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'se-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent {
  constructor(private router: Router) {}
  goto(isOrganisation: boolean) {
    this.router.navigate(['provider/stepper'], {
      queryParams: { isOrganisation: isOrganisation }
    });
  }
}
