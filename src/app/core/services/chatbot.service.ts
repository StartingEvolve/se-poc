import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import BotpressConfig from '@vendors/botpress/botpress.config';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  searchSub: Subscription;
  locator: string;
  bp = new BotpressConfig().getConfig();

  constructor(private router: Router) {
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

  toggleBot() {
    this.bp.client.sendEvent({
      type: this.bp.webchatOpen ? 'hide' : 'show'
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
