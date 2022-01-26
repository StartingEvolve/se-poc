import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface InputError {
  is: boolean;
  msg: string;
}

@Component({
  selector: 'se-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  emailError: InputError = {
    is: false,
    msg: ''
  };
  passwordError: InputError = {
    is: false,
    msg: ''
  };

  constructor(private ts: TranslateService) {}
}
