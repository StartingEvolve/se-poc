import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import BotpressConfig from '@vendors/botpress/botpress.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  searchSub: Subscription;
  locator: string;

  constructor(private router: Router) {
    const bp = new BotpressConfig();
    this.locator = 'courses[refinementList][';
    this.onBotSearchRequest();
  }

  onBotSearchRequest() {
    const searchParams$ = fromEvent(window, 'message');
    this.searchSub = searchParams$.subscribe((event: any) => {
      if (event.data.type === 'data') {
        const searchParams = event.data.searchParam;
        console.log(this.buildRefinementUrl('courses', searchParams));
        this.router.navigateByUrl(
          this.buildRefinementUrl('courses', searchParams)
        );
      }
    });
  }

  buildRefinementUrl(domain: string, params: any) {
    let refinementUrl = `/${domain}?`;
    for (const [param, value] of Object.entries(params)) {
      refinementUrl += `${domain}[refinementList][${param}][0]=${value}&`;
    }
    return refinementUrl;
  }
}
