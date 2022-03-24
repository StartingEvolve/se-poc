import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface ArticleData extends Highlighted {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Highlighted {
  _highlightResult?: {};
  label?: string;
  highlighted?: string;
}

@Component({
  selector: 'se-article-card',
  template: `<!-- card container -->
    <div
      (click)="goToArticle(data?.id)"
      class="sm:max-w-6xl border-gray-300 border cursor-pointer bg-white shadow-lg rounded overflow-hidden m-4 sm:flex"
    >
      <div
        [ngStyle]="{ 'background-image': 'url(' + data?.image + ')' }"
        class="h-48 border-b-gray-500 border-b-2 sm:border-b-0 sm:border-r-2 sm:border-r-gray-300 bg-image sm:h-auto sm:w-48 md:w-64 flex-none bg-cover bg-center rounded-tl rounded-tr md:rounded-tr-none md:rounded-bl text-center overflow-hidden"
      ></div>

      <!-- card-content -->
      <div
        class="px-2 min-h-[200px] sm:w-[400px] md:w-[500px] lg:w-[800px] block hover:bg-gray-50"
      >
        <div
          class="px-4 py-2 sm:px-6 h-full space-y-2 flex justify-evenly flex-col"
        >
          <div class="flex items-center justify-between">
            <p class="text-base md:text-xl font-medium text-indigo-600">
              {{ data?.title | truncate: [80, '...'] }}
            </p>
          </div>
          <p *ngIf="data?.description" class="mb-4 text-grey-dark text-sm">
            <ais-highlight attribute="description" [hit]="data"></ais-highlight>
          </p>
          <div class="pt-1 md:pt-4 sm:flex sm:justify-between">
            <div class="flex flex-wrap sm:w-[70%] space-x-2 gap-2 -m-1">
              <p
                *ngIf="data?.category"
                class="flex items-center text-sm text-gray-500 m-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                &nbsp;
                {{ data?.category }}
              </p>
            </div>
            <div
              *ngIf="data['createdAt.formatted']"
              class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
            >
              <!-- Heroicon name: solid/calendar -->
              <svg
                class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                />
              </svg>
              <p>
                <time datetime="2020-01-07">{{
                  data['createdAt.formatted']
                }}</time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> `
})
export class ArticleCardComponent {
  @Input() data: any;

  constructor(private router: Router) {}

  goToArticle(id: string) {
    window.scrollTo(0, 0);
    this.router.navigate(['article', id]);
  }
}
