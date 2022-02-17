import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  OnInit,
  Output,
  QueryList
} from '@angular/core';

import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'se-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() returnActiveId = new EventEmitter<number>();
  constructor() {}

  ngAfterContentInit(): void {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  selectTab(tab: any) {
    // deactivate all tabs
    this.tabs.toArray().forEach((tab) => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
    this.returnActiveId.emit(tab.id);
  }
}
