import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'se-language-picker-web',
  templateUrl: './language-picker-web.component.html',
  styleUrls: ['./language-picker-web.component.scss']
})
export class LanguagePickerWebComponent {
  showLanguageMenu: boolean = false;
  constructor() {}

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }
}
