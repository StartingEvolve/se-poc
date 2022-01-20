import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(private ts: TranslateService) {}

  ngOnInit(): void {
    console.log('Cannot be empty');
  }
  test(): void {
    this.ts.use('en');
  }
}
