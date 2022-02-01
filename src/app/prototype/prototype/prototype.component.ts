import { Component, OnInit } from '@angular/core';

export interface PrototypeElement {
  name: string;
  description: string;
  link: string;
}

const ELEMENT_DATA: PrototypeElement[] = [
  {
    name: 'Example1',
    description: 'Example1 WORKS LMAO',
    link: '/prototype/example1'
  },
  {
    name: 'Example2',
    description: 'Example2 WORKS LMAO',
    link: '/prototype/example2'
  },
  {
    name: 'Article Component',
    description: 'Description du composant Article',
    link: '/prototype/articleproto'
  }
];

@Component({
  selector: 'se-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.scss']
})
export class PrototypeComponent {
  displayTable: boolean = true;
  displayedColumns: string[] = ['name', 'description', 'link'];
  dataSource = ELEMENT_DATA;
}
