import { Component, Input } from '@angular/core';

interface CourseData extends Highlighted {
  title: string;
  description: string;
  image: string;
  public?: string; //Filter
  newPrice?: string;
  price?: string;
  location?: {
    address?: string;
    commune?: string;
    region?: string;
    zipCode?: string;
  };
  learning_mode?: string; //Filter
  eligibility?: string; //Filter
  duration?: string; //Filter
  deadline?: string;
  author?: string[];
  companyLogo?: string;
  rating?: number;
  ratersNumber?: number;
}

interface Highlighted {
  _highlightResult?: {};
  label?: string;
  highlighted?: string;
}

@Component({
  selector: 'se-course-card',
  template: `<!-- card container -->
    <div
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
            <div class="ml-2 flex-shrink-0 flex">
              <p
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
              >
                {{ data?.price }}
              </p>
            </div>
          </div>
          <p *ngIf="data?.description" class="mb-4 text-grey-dark text-sm">
            <ais-highlight attribute="description" [hit]="data"></ais-highlight>
          </p>
          <div class="pt-1 md:pt-4 sm:flex sm:justify-between">
            <div class="flex flex-wrap sm:w-[70%] space-x-2 gap-2 -m-1">
              <p
                *ngIf="data?.public"
                class="flex items-center text-sm text-gray-500 m-1"
              >
                <!-- Heroicon name: solid/users -->
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                  />
                </svg>
                {{ data.public }}
              </p>
              <p
                *ngIf="data?.learningMode"
                class="flex items-center text-sm text-gray-500 m-1"
              >
                <!-- Heroicon name: solid/location-marker -->
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ data.learningMode }} | {{ data['location.region'] }}
              </p>
              <p
                *ngIf="data?.duration"
                class="flex items-center text-sm text-gray-500 m-1"
              >
                <img
                  class="flex-shrink-0 mr-1.5 h-5 w-5"
                  src="/assets/icons/schedule.svg"
                  alt="Schedule"
                />
                {{ data.duration }}
              </p>
            </div>
            <div
              *ngIf="data?.deadline"
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
                Fermé le
                <time datetime="2020-01-07">{{ data.deadline }}</time>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> `
})
export class CourseCardComponent {
  @Input() data: CourseData;

  constructor() {}
}
