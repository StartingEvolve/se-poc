import { Component, Input } from '@angular/core';

export interface PaginationData {
  current_page: number;
  from: number;
  last_page: number;
  last_page_url: string;
  to: number;
}

@Component({
  selector: 'se-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() data: PaginationData;

  constructor() {}

  prev() {}

  next() {}

  goto(i: number) {
    console.log(i);
  }
}
