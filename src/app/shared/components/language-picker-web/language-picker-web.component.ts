import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface LgItem {
  name: string;
  path: string;
  active: boolean;
}
@Component({
  selector: 'se-language-picker-web',
  templateUrl: './language-picker-web.component.html',
  styleUrls: ['./language-picker-web.component.scss']
})
export class LanguagePickerWebComponent {
  showLanguageMenu: boolean = false;
  lgItems: LgItem[];
  activePath: string;
  constructor(private ts: TranslateService) {
    this.lgItems = [
      {
        name: 'fr',
        path: '/assets/flags/fr.png',
        active: this.ts.getDefaultLang() == 'fr'
      },
      {
        name: 'en',
        path: '/assets/flags/en.png',
        active: this.ts.getDefaultLang() == 'en'
      }
    ];
    this.activePath = this.lgItems.find((item) => item.active == true).path;
    this.ts.onDefaultLangChange.subscribe((result) => {
      this.fetchNewActiveLanguage(result.lang);
    });
  }
  fetchNewActiveLanguage(param: string): void {
    this.lgItems.forEach((item) => (item.active = item.name == param));
    this.activePath = this.lgItems.find((item) => item.active == true).path;
  }

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }
  changeLanguage(param: string): void {
    this.toggleLanguageMenu();
    this.ts.setDefaultLang(param);
    this.fetchNewActiveLanguage(param);
  }
}
