import { Component, Input, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'se-articlecreation',
  templateUrl: './articlecreation.component.html',
  styleUrls: ['./articlecreation.component.scss']
})
export class ArticlecreationComponent {
  articleContent: string;
  constructor() {
    this.articleContent = '';
  }
  created(event: Quill) {
    console.log('editor-created', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.articleContent = event['html'];
  }

  logIt() {
    console.log(this.articleContent);
  }
}
