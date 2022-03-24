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
        </div>
      </div>
    </div> `
})
export class ArticleCardComponent {
  @Input() data: ArticleData;

  constructor(private router: Router) {}

  goToArticle(id: string) {
    window.scrollTo(0, 0);
    this.router.navigate(['article', id]);
  }
}
