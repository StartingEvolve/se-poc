import { Component } from '@angular/core';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';
import { Router } from '@angular/router';
import { AuthService } from '@se/core/services/auth.service';

//Todo (zack) : improve UI by removing clutter -> height = viewport w/ navbar | footer
@Component({
  selector: 'se-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  userState: UserInterface;
  constructor(
    private as: AuthStore,
    private aService: AuthService,
    private router: Router
  ) {
    this.as.stateChanged.subscribe((state) => {
      this.userState = state;
      if (this.userState?.isLoggedIn && this.userState?.isEmailVerified) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  resendEmailVerification() {
    this.aService
      .resendEmailVerification(this.userState.user.email_lower)
      .then((result) => {
        if (result) {
          console.log(result.code);
        }
      });
  }
}
