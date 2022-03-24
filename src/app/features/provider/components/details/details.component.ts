import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';

export interface detailsObject {
  pub: string[];
  mode: string;
}

@Component({
  selector: 'se-details-component',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Output() goNextEvent = new EventEmitter<detailsObject>();
  @Output() goBackEvent = new EventEmitter<null>();
  @Input() data: detailsObject;
  audienceActiveItems: string[];
  showError: boolean;
  activeDiv1: string;
  activeDiv2: string;
  outputData: detailsObject;

  constructor() {
    this.audienceActiveItems = [];
    this.outputData = { pub: [], mode: '' };
    this.showError = false;
  }

  addOrRemove(item: string) {
    if (this.audienceActiveItems.includes(item)) {
      this.audienceActiveItems = this.audienceActiveItems.filter(
        (itemx) => itemx != item
      );
    } else {
      this.audienceActiveItems.push(item);
    }
    this.outputData.pub = this.audienceActiveItems;
  }

  setActive2(divName) {
    this.activeDiv2 = divName;
    if (this.activeDiv2 == 'div5') {
      this.outputData.mode = 'En entreprise';
    } else if (this.activeDiv2 == 'div6') {
      this.outputData.mode = 'En centre';
    } else if (this.activeDiv2 == 'div7') {
      this.outputData.mode = 'En alternance';
    } else if (this.activeDiv2 == 'div8') {
      this.outputData.mode = 'À distance';
    }
  }
  isActive2(divName) {
    return this.activeDiv2 === divName;
  }
  goBack(): void {
    this.goBackEvent.emit(null);
  }
  goNext() {
    if (this.outputData.pub.length == 0 && this.outputData.mode == '') {
      this.showError = true;
      return;
    }
    this.goNextEvent.emit(this.outputData);
  }
}
