import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  Type
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'se-title-component',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Output() goNextEvent = new EventEmitter<string>();
  @Input() data: string;
  titleForm: FormGroup;
  showErrors: boolean = false;

  ngOnInit(): void {
    console.log(this.data);
    this.titleForm = new FormGroup({
      title: new FormControl(this.data ? this.data['title'] : '', [
        Validators.required,
        Validators.minLength(4)
      ])
    });

    console.log(typeof this.data);
  }
  goNext(): void {
    if (this.titleForm.value.title == '') {
      this.showErrors = true;
      return;
    }
    this.goNextEvent.emit(this.titleForm.value.title);
  }
}
