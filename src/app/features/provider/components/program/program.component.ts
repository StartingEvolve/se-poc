import { Component, Input, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';
import { sideBarItem } from '../../views/course/course.component';

@Component({
  selector: 'se-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {
  @Input() data: sideBarItem;

  blurred = false;
  focused = false;
  constructor() {}
  created(event: Quill) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event);
  }

  focus($event) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event);
    this.focused = true;
    this.blurred = false;
  }

  blur($event) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }
}
