import { Component, forwardRef, Inject, OnInit, Optional } from '@angular/core';
import {
  NgAisIndex,
  NgAisInstantSearch,
  TypedBaseWidget
} from 'angular-instantsearch';
import connectPagination, {
  PaginationWidgetDescription,
  PaginationConnectorParams
} from 'instantsearch.js/es/connectors/pagination/connectPagination';

@Component({
  selector: 'se-pagination-box',
  template: ` <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <button
        (click)="state.refine(state.currentRefinement - 1)"
        [disabled]="state.isFirstPage"
        class="disabled:text-gray-300 disabled:bg-gray-200 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        (click)="state.refine(state.currentRefinement + 1)"
        [disabled]="state.isLastPage"
        class="disabled:text-gray-300 disabled:bg-gray-200 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </button>
    </div>
    <div
      class="px-4 hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
    >
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">0</span>
          to
          <span class="font-medium"></span>
          of
          <span class="font-medium">{{ state.nbHits }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            (click)="state.refine(state.currentRefinement - 1)"
            [disabled]="state.isFirstPage"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span class="sr-only">Previous</span>
            <!-- Heroicon name: solid/chevron-left -->
            <svg
              class="h-5 w-5"
              [class.text-gray-200]="state.currentRefinement === 0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <!-- Current: "", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <button
            *ngFor="let page of state.pages"
            (click)="state.refine(page)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            [class.active]="page === state.currentRefinement"
          >
            {{ page + 1 }}
          </button>
          <button
            (click)="state.refine(state.currentRefinement + 1)"
            [disabled]="state.isLastPage"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span class="sr-only">Next</span>
            <!-- Heroicon name: solid/chevron-right -->
            <svg
              class="h-5 w-5"
              [class.text-gray-200]="state.isLastPage"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>`,
  styles: [
    '.active {\n' +
      '  @apply z-10 bg-indigo-50 border-indigo-500 text-indigo-600;\n' +
      '}\n'
  ]
})
export class PaginationComponent
  extends TypedBaseWidget<
    PaginationWidgetDescription,
    PaginationConnectorParams
  >
  implements OnInit
{
  public state: PaginationWidgetDescription['renderState'] = {
    pages: [],
    currentRefinement: 0,
    nbHits: 0,
    nbPages: 0,
    isFirstPage: false,
    isLastPage: false,
    createURL: undefined,
    canRefine: false,
    refine(value: number): void {}
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('Pagination');
  }

  ngOnInit() {
    this.createWidget(connectPagination, {
      // instance options
    });
    super.ngOnInit();
  }
}
