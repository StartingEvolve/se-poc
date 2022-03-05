import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore, UserInterface } from '@se/core/store/auth/auth.store';
import { CustomValidators } from '@se/shared/helpers/CustomValidators';
export interface accountInfosObject {
  password: string;
  email: string;
}

@Component({
  selector: 'se-account-informations',
  templateUrl: './account_informations.component.html',
  styleUrls: ['./account_informations.component.scss']
})
export class AccountInformationComponent implements OnInit {
  @Output() goNextEvent = new EventEmitter<accountInfosObject>();
  @Input() data: accountInfosObject;
  accountForm: FormGroup;
  showErrors: boolean;
  isLoading: boolean;
  userState: UserInterface;
  firebaseErrorCode: string;
  constructor(
    private router: Router,
    private as: AuthStore,
    private aService: AuthService
  ) {
    this.isLoading = false;
    this.showErrors = false;
  }
  ngOnInit(): void {
    this.accountForm = new FormGroup(
      {
        email: new FormControl(this.data?.email ? this.data.email : '', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(
          this.data?.password ? this.data.password : '',
          [Validators.required]
        ),
        confirmPassword: new FormControl(this.data ? this.data.password : '', [
          Validators.required
        ]),
        checkbox: new FormControl(this.data ? true : false, [
          Validators.requiredTrue
        ])
      },
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
  }
  registerUser() {
    if (this.accountForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    this.aService
      .loginUser(
        this.trim(this.accountForm.value.email),
        this.accountForm.value.password
      )
      .then((result) => {
        window.scrollTo(0, 0);
        this.isLoading = false;
        if (result === null) {
          this.firebaseErrorCode = 'Ce compte existe déja';
        } // no matter what, when the auth service returns, we hide the progress indicator
        if (result.isValid == false) {
          if (result.code === 'auth/user-not-found') {
            this.goNextEvent.emit({
              email: this.trim(this.accountForm.value.email),
              password: this.accountForm.value.password
            });
          } else {
            this.firebaseErrorCode = 'Ce compte existe déja';
          }
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
    return this.showErrors && this.accountForm.get(name).invalid;
  }
  getEmailErrors(): string {
    if (this.accountForm.get('email').errors.required) {
      return 'AUTH.REQUIRED_EMAIL';
    } else {
      return 'AUTH.NOT_VALID_EMAIL';
    }
  }
  getPasswordErrors() {
    if (this.accountForm.get('password').errors.required) {
      return 'AUTH.REQUIRED_PASSWORD';
    } else {
      return 'AUTH.PASSWORD_PATTERN';
    }
  }

  getConfirmPasswordErrors() {
    if (this.accountForm.get('confirmPassword').errors.required) {
      return 'AUTH.REQUIRED_CONFIRMPASSWORD';
    } else this.accountForm.get('confirmPassword').errors.mustMatch;
    {
      return 'AUTH.MUSTMATCH';
    }
  }
}
