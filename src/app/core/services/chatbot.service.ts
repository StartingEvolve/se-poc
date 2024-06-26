import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import BotpressConfig from '@vendors/botpress/botpress.config';
import { unescapeHtml } from '@shared/helpers/strings';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  searchSub: Subscription;

  bp = new BotpressConfig().getConfig();

  constructor(private router: Router) {
    //Todo(zack) : Bug -> Navigation does not deliver expected search results when navigating from the same route
    //see : https://stackoverflow.com/questions/47813927/how-to-refresh-a-component-in-angular
    //https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
    //Hotfix: changing the routing strategy, this will decrease performance since angular will start reloading routes
    //Instead of using the same instances, I'll think about making a custom routing strategy that will only fire on search
    //results page : https://javascript.plainenglish.io/angular-route-reuse-strategy-b5d40adce841
    //https://github.com/angular/angular/issues/13831
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.onBotSearchRequest();
  }

  onBotSearchRequest(reload = false) {
    const searchParams$ = fromEvent(window, 'message');
    this.searchSub = searchParams$.subscribe((event: any) => {
      if (event.data.type === 'data') {
        const searchParams = event.data.searchParam;
        console.log(
          unescapeHtml(this.buildRefinementUrl('courses', searchParams))
        );
        this.router.navigateByUrl(
          unescapeHtml(this.buildRefinementUrl('courses', searchParams))
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
      refinementUrl += `${domain}[refinementList][${param}][0]=${this.capitalize(
        value
      )}&`;
    }
    return refinementUrl;
  }

  //Todo(zack) handle value strings in the refinement url
  capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
