import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '@se/core/services/auth.service';
import { UserDocument } from '@se/shared/types/user-document';
export interface profileInfoObject {
  firstName: string;
  lastName: string;
  about?: string;
  phone: { prefix: string; value: string };
  country?: string;
  city?: string;
  streetAddress?: string;
  zipCode?: string;
  photoURL?: string;
}
@Component({
  selector: 'se-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.scss']
})
export class ProfileInformationsComponent implements OnInit {
  @Input() data: profileInfoObject;
  @Output() goNextEvent = new EventEmitter<profileInfoObject>();
  file: File;
  userInfos: profileInfoObject;
  showErrors: boolean = false;
  accountForm: FormGroup;
  fileError: string;
  imageURL: string;
  userState: UserDocument;
  isLoading: boolean;

  constructor(
    private aService: AuthService,
    private aStorage: AngularFireStorage
  ) {
    this.isLoading = false;
    this.fileError = '';
  }
  // Image Preview
  showPreview(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.accountForm.get('photoURL').updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      if (this.file.size < 2000000 && this.file.type.includes('image/')) {
        this.accountForm.controls['photoURL'].setValue(reader.result as string);
      } else {
        (event.target as HTMLInputElement).value = '';
        this.fileError = 'File too large';
      }
    };
    reader.readAsDataURL(this.file);
  }
  submitForm() {
    if (this.accountForm.invalid || this.fileError !== '') {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    const object = {
      firstName: this.trimAndCapitalize(this.accountForm.value.firstName),
      lastName: this.trimAndCapitalize(this.accountForm.value.lastName),
      ...(this.accountForm.value.about !== '' && {
        about: this.accountForm.value.about
      }),
      phone: {
        prefix: this.accountForm.value.phonePrefix,
        value: this.accountForm.value.phone
      },
      country: this.accountForm.value.country,
      ...(this.accountForm.value.city !== '' && {
        city: this.accountForm.value.city
      }),
      ...(this.accountForm.value.streetAddress !== '' && {
        streetAddress: this.accountForm.value.streetAddress
      }),
      ...(this.accountForm.value.zipCode !== '' && {
        zipCode: this.accountForm.value.zipCode
      }),
      photoURL: this.accountForm.value.photoURL
    };
    this.goNextEvent.emit(object);
    window.scrollTo(0, 0);
    this.isLoading = false;
  }
  checkError(name: string): boolean {
    return this.showErrors && this.accountForm.get(name).invalid;
  }
  getFirstNameErrors() {
    if (this.accountForm.get('firstName').errors.required) {
      return 'AUTH.REQUIRED_FIRSTNAME';
    } else if (this.accountForm.get('firstName').hasError('maxlength')) {
      return 'AUTH.MAX_FIRSTNAME';
    } else {
      return 'AUTH.MIN_FIRSTNAME';
    }
  }
  getLastNameErrors() {
    if (this.accountForm.get('lastName').errors.required) {
      return 'AUTH.REQUIRED_LASTNAME';
    } else if (this.accountForm.get('lastName').hasError('maxlength')) {
      return 'AUTH.MAX_LASTNAME';
    } else {
      return 'AUTH.MIN_LASTNAME';
    }
  }
  getPhoneErrors() {
    if (this.accountForm.get('phone').errors.required) {
      return 'AUTH.REQUIRED_PHONE';
    } else {
      return 'AUTH.PHONE_PATTERN';
    }
  }
  getFileErrors() {
    if (this.accountForm.get('photoURL').errors.required) {
      return 'AUTH.REQUIRED_FILE';
    }
    return '';
  }
  trim(name: string): string {
    return name.trim();
  }
  trimAndCapitalize(name: string): string {
    const namex = this.trim(name);
    return namex.substring(0, 1).toUpperCase() + namex.substring(1);
  }
  checkFormat(phone: string) {
    if (phone.charAt(0) === '0') {
      return phone.substring(1);
    } else {
      return phone;
    }
  }
  ngOnInit(): void {
    this.accountForm = new FormGroup({
      firstName: new FormControl(this.data ? this.data.firstName : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      lastName: new FormControl(this.data ? this.data.lastName : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      about: new FormControl(this.data?.about ? this.data.about : ''),
      phonePrefix: new FormControl(
        this.data?.phone ? this.data.phone.prefix : '+33'
      ),
      phone: new FormControl(this.data?.phone ? this.data.phone.value : '', [
        Validators.required,
        Validators.pattern('^0?[1-9][0-9]{8}$')
      ]),
      country: new FormControl(this.data?.city ? this.data.country : 'France'),
      city: new FormControl(this.data?.country ? this.data.city : ''),
      streetAddress: new FormControl(
        this.data?.streetAddress ? this.data.streetAddress : ''
      ),
      zipCode: new FormControl(this.data?.zipCode ? this.data.zipCode : ''),
      photoURL: new FormControl(this.data ? this.data.photoURL : '', [
        Validators.required
      ])
    });
  }
}
