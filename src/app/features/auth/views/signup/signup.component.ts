import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';
import { CustomValidators } from '@se/shared/helpers/CustomValidators';

@Component({
  selector: 'se-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showErrors: boolean;
  isLoading: boolean;
  userState: UserInterface;
  firebaseErrorCode: string;
  validateError: boolean = false;
  constructor(
    private router: Router,
    private as: AuthStore,
    private ts: TranslateService,
    private aService: AuthService
  ) {
    this.isLoading = false;
    this.showErrors = false;

    this.signupForm = new FormGroup(
      {
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          )
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        checkbox: new FormControl(false, [Validators.requiredTrue])
      },
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
  }
  ngOnInit(): void {
    this.as.stateChanged.subscribe((state) => {
      this.userState = state;
      if (this.userState?.isLoggedIn) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  async registerUser() {
    if (this.signupForm.invalid) {
      this.showErrors = true;
      return;
    }
    //TODO refactor email validation flow
    let flag = false;
    await this.aService
      .verifyEmailExistence(this.signupForm.value.email)
      .then((res: any) => {
        if (res.deliverability != 'DELIVERABLE') {
          this.validateError = true;
          flag = true;
          return;
        }
        if (res.is_disposable_email == true) {
          this.validateError = true;
          flag = true;
          return;
        }
      });
    console.log(flag);
    if (flag) return;
    this.isLoading = true;
    const fullName =
      this.trimAndCapitalize(this.signupForm.value.firstName) +
      ' ' +
      this.trimAndCapitalize(this.signupForm.value.lastName);
    this.aService
      .signupUser({
        password: this.signupForm.value.password,
        email: this.trim(this.signupForm.value.email),
        displayName: fullName
      })
      .then((result) => {
        window.scrollTo(0, 0);
        this.isLoading = false; // no matter what, when the auth service returns, we hide the progress indicator
        if (result == null) {
          // null is success, false means there was an error
          console.log('Registering ...');
          console.log('Ok'); // when the user is logged in, navigate them to dashboard
        } else if (result.isValid == false) {
          console.log('Register error', result);
          this.firebaseErrorCode = 'FIREBASE.' + result.code;
        }
      });
  }
  trim(name: string): string {
    return name.trim();
  }
  trimAndCapitalize(name: string): string {
    const namex = this.trim(name);
    return namex.substring(0, 1).toUpperCase() + namex.substring(1);
  }
  checkError(name: string): boolean {
    return this.showErrors && this.signupForm.get(name).invalid;
  }
  getEmailErrors(): string {
    if (this.signupForm.get('email').errors.required) {
      return 'AUTH.REQUIRED_EMAIL';
    } else {
      return 'AUTH.NOT_VALID_EMAIL';
    }
  }
  getPasswordErrors() {
    if (this.signupForm.get('password').errors.required) {
      return 'AUTH.REQUIRED_PASSWORD';
    } else {
      return 'AUTH.PASSWORD_PATTERN';
    }
  }
  getFirstNameErrors() {
    if (this.signupForm.get('firstName').errors.required) {
      return 'AUTH.REQUIRED_FIRSTNAME';
    } else if (this.signupForm.get('firstName').hasError('maxlength')) {
      return 'AUTH.MAX_FIRSTNAME';
    } else {
      return 'AUTH.MIN_FIRSTNAME';
    }
  }
  getLastNameErrors() {
    if (this.signupForm.get('lastName').errors.required) {
      return 'AUTH.REQUIRED_LASTNAME';
    } else if (this.signupForm.get('lastName').hasError('maxlength')) {
      return 'AUTH.MAX_LASTNAME';
    } else {
      return 'AUTH.MIN_LASTNAME';
    }
  }
  getConfirmPasswordErrors() {
    if (this.signupForm.get('confirmPassword').errors.required) {
      return 'AUTH.REQUIRED_CONFIRMPASSWORD';
    } else this.signupForm.get('confirmPassword').errors.mustMatch;
    {
      return 'AUTH.MUSTMATCH';
    }
  }
}
