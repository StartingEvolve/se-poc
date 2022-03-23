import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface organisationInfosObject {
  name: string;
  photoURL: string;
}
@Component({
  selector: 'se-organisation-informations',
  templateUrl: './organisation-informations.component.html',
  styleUrls: ['./organisation-informations.component.scss']
})
export class OrganisationInformationsComponent implements OnInit {
  organisationForm: FormGroup;
  @Output() goNextEvent = new EventEmitter<organisationInfosObject>();
  @Input() data: organisationInfosObject;
  showErrors: boolean;
  isLoading: boolean;
  file: File;
  fileError: string;
  constructor() {
    this.isLoading = false;
    this.fileError = '';
  }
  showPreview(event) {
    this.file = (event.target as HTMLInputElement).files[0];
    this.organisationForm.get('photoURL').updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      if (this.file.size < 2000000 && this.file.type.includes('image/')) {
        this.organisationForm.controls['photoURL'].setValue(
          reader.result as string
        );
      } else {
        (event.target as HTMLInputElement).value = '';
        this.fileError = 'File too large';
      }
    };
    reader.readAsDataURL(this.file);
  }
  checkError(name: string): boolean {
    return this.showErrors && this.organisationForm.get(name)?.invalid;
  }
  getFileErrors() {
    if (this.organisationForm.get('photoURL').errors.required) {
      return 'AUTH.REQUIRED_FILE';
    }
    return '';
  }
  ngOnInit(): void {
    this.organisationForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : '', [
        Validators.required
      ]),
      photoURL: new FormControl(this.data ? this.data.photoURL : '', [
        Validators.required
      ])
    });
  }
  getNameErrors() {
    if (this.organisationForm.get('name').errors.required) {
      return 'AUTH.REQUIRED_FIRSTNAME';
    }
    return '';
  }
  getPhotoURLErrors() {
    if (this.organisationForm.get('photoURL').errors.required) {
      return 'AUTH.REQUIRED_IMAGE';
    }
    return '';
  }
  submitForm() {
    if (this.organisationForm.invalid || this.fileError !== '') {
      this.showErrors = true;
      return;
    }
    this.isLoading = true;
    const object = {
      name: this.trimAndCapitalize(this.organisationForm.value.name),
      photoURL: this.organisationForm.value.photoURL
    };
    this.goNextEvent.emit(object);
    window.scrollTo(0, 0);
    this.isLoading = false;
  }
  trim(name: string): string {
    return name.trim();
  }
  trimAndCapitalize(name: string): string {
    const namex = this.trim(name);
    return namex.substring(0, 1).toUpperCase() + namex.substring(1);
  }
}
