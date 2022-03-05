import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface professionalInfosObject {
  profession: string;
  domain: string;
}
@Component({
  selector: 'se-professional-informations',
  templateUrl: './professional-informations.component.html',
  styleUrls: ['./professional-informations.component.scss']
})
export class ProfessionalInformationsComponent implements OnInit {
  @Output() goNextEvent = new EventEmitter<professionalInfosObject>();
  @Input() data: professionalInfosObject;
  professionalForm: FormGroup;
  constructor() {
    this.professionalForm = new FormGroup({
      profession: new FormControl('Consultant', [Validators.required]),
      domain: new FormControl('Marketing Digital', [Validators.required])
    });
  }
  submitForm() {
    const object = {
      profession: this.professionalForm.value.profession,
      domain: this.professionalForm.value.domain
    };
    this.goNextEvent.emit(object);
  }
  ngOnInit(): void {
    this.professionalForm = new FormGroup({
      profession: new FormControl(
        this.data ? this.data.profession : 'Consultant',
        [Validators.required]
      ),
      domain: new FormControl(
        this.data ? this.data.domain : 'Marketing Digital',
        [Validators.required]
      )
    });
  }
}
