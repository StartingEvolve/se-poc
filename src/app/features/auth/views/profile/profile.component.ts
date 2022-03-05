import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '@se/core/services/auth.service';
import { AuthStore } from '@se/core/store/auth/auth.store';
import { UserDocument } from '@se/shared/types/user-document';

@Component({
  selector: 'se-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  file: File;
  accountForm: FormGroup;
  fileError: string;
  imageURL: string;
  userState: UserDocument;
  isLoading: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private aStore: AuthStore,
    private aService: AuthService,
    private aStorage: AngularFireStorage
  ) {
    this.isLoading = false;
    this.fileError = '';
    this.accountForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      about: new FormControl(['']),
      phone: new FormControl(['']),
      country: new FormControl(['France']),
      city: new FormControl(['']),
      street_address: new FormControl(['']),
      zipCode: new FormControl(['']),
      language: new FormControl(['']),
      photoURL: new FormControl([''])
    });

    this.aStore.stateChanged.subscribe((state) => {
      if (state) {
        this.userState = state?.user;
        this.accountForm.controls['email'].setValue(this.userState.email);
        this.accountForm.controls['email'].disable();
        if (this.userState?.photoURL) {
          this.accountForm.controls['photoURL'].setValue(
            this.userState.photoURL
          );
        }
        this.accountForm.controls['first_name'].setValue(
          state.user.displayName.split(' ')[0]
        );
        this.accountForm.controls['last_name'].setValue(
          state.user.displayName.split(' ')[1]
        );
        if (this.userState?.about) {
          this.accountForm.controls['about'].setValue(this.userState.about);
        }
        if (this.userState?.street_address) {
          this.accountForm.controls['street_address'].setValue(
            this.userState.street_address
          );
        }
        if (this.userState?.zipCode) {
          this.accountForm.controls['zipCode'].setValue(this.userState.zipCode);
        }
        if (this.userState?.city) {
          this.accountForm.controls['city'].setValue(this.userState.city);
        }
        if (this.userState?.country) {
          this.accountForm.controls['country'].setValue(this.userState.country);
        }
      }
    });
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
    if (this.accountForm.invalid) {
      console.log('ERROR');
      return;
    }
    this.isLoading = true;
    const imageRef = this.aStorage.ref('users/' + this.userState.uid);
    if (this.file != null) {
      imageRef.put(this.file).then((snapshot) => {
        imageRef.getDownloadURL().subscribe((downloadURL) => {
          if (downloadURL) {
            const fullName =
              this.trimAndCapitalize(this.accountForm.value.first_name) +
              ' ' +
              this.trimAndCapitalize(this.accountForm.value.last_name);
            const data: UserDocument = {
              accountType: 'endUser',
              displayName: fullName,
              displayName_lower: fullName.toLowerCase(),
              email: this.userState.email,
              email_lower: this.userState.email_lower,
              about: this.accountForm.value.about,
              country: this.accountForm.value.country,
              street_address: this.accountForm.value.street_address,
              zipCode: this.accountForm.value.zipCode,
              city: this.accountForm.value.city,
              photoURL: downloadURL
            };
            this.aService.updateUserData(data).then(
              (data) => {
                this.isLoading = false;
              },
              (error) => {
                console.log(error);
              }
            );
          }
        });
      });
    } else {
      const fullName =
        this.trimAndCapitalize(this.accountForm.value.first_name) +
        ' ' +
        this.trimAndCapitalize(this.accountForm.value.last_name);
      const data: UserDocument = {
        accountType: 'endUser',
        displayName: fullName,
        displayName_lower: fullName.toLowerCase(),
        email: this.userState.email,
        email_lower: this.userState.email_lower,
        about: this.accountForm.value.about,
        country: this.accountForm.value.country,
        street_address: this.accountForm.value.street_address,
        zipCode: this.accountForm.value.zipCode,
        city: this.accountForm.value.city
      };
      this.aService.updateUserData(data).then(
        (data) => {
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  trim(name: string): string {
    return name.trim();
  }
  trimAndCapitalize(name: string): string {
    const namex = this.trim(name);
    return namex.substring(0, 1).toUpperCase() + namex.substring(1);
  }
}
