import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';

export interface InputError {
  is: boolean;
  msg: string;
}

@Component({
  selector: 'se-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  isLoading: boolean;
  loginForm: FormGroup;
  firebaseErrorCode: string;
  userState: UserInterface;
  showErrors: boolean;
  constructor(
    private router: Router,
    private ts: TranslateService,
    private as: AuthStore,
    private aService: AuthService
  ) {
    this.isLoading = false;
    this.showErrors = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
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
  loginUser() {
    // show the progress indicator as we start the Firebase login process
    this.loginForm.get('email').errors;
    if (this.loginForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    this.aService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        this.isLoading = false; // no matter what, when the auth service returns, we hide the progress indicator
        if (result == null) {
          // null is success, false means there was an error
          console.log('logging in...');
          this.router.navigate(['/dashboard']); // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorCode = 'FIREBASE.' + result.code;
        }
      });
  }
  showEmailErrors() {
    if (this.loginForm.get('email').errors.required) {
      return 'AUTH.REQUIRED_EMAIL';
    } else {
      return 'AUTH.NOT_VALID_EMAIL';
    }
  }
  showPasswordErrors() {
    if (this.loginForm.get('password').errors.required) {
      return 'AUTH.REQUIRED_PASSWORD';
    }
    return '';
  }
}
