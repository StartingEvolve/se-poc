import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';

@Component({
  selector: 'se-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isReset: boolean;
  isLoading: boolean;
  resetForm: FormGroup;
  firebaseErrorCode: string;
  userState: UserInterface;
  showErrors: boolean;
  constructor(
    private router: Router,
    private as: AuthStore,
    private aService: AuthService
  ) {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  ngOnInit(): void {
    this.as.stateChanged.subscribe((state) => {
      this.userState = state;
      if (this.userState?.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  trim(name: string): string {
    return name.trim();
  }
  showEmailErrors() {
    if (this.resetForm.get('email').errors.required) {
      return 'AUTH.REQUIRED_EMAIL';
    } else {
      return 'AUTH.NOT_VALID_EMAIL';
    }
  }
  resetUser() {
    // show the progress indicator as we start the Firebase login process
    if (this.resetForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    this.aService
      .resetPassword(this.trim(this.resetForm.value.email))
      .then((result) => {
        this.isLoading = false; // no matter what, when the auth service returns, we hide the progress indicator
        if (result == null) {
          this.isReset = true;
          console.log('Reset password...'); // when the user is logged in, navigate them to dashboard
        } else if (result) {
          console.log('login error', result);
          this.firebaseErrorCode = 'FIREBASE.' + result.code;
        }
      });
  }
}
