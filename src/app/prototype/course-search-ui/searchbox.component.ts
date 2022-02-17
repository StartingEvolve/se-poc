import { Component, Inject, forwardRef, Optional, OnInit } from '@angular/core';
import {
  NgAisInstantSearch,
  NgAisIndex,
  TypedBaseWidget
} from 'angular-instantsearch';
import connectSearchBox, {
  SearchBoxWidgetDescription,
  SearchBoxConnectorParams
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';

const noop = (): void => {};
const parseNumberInput = (input?: number | string): number => {
  return typeof input === 'string' ? parseInt(input, 10) : input;
};

@Component({
  selector: 'se-searchbox',
  template: `
    <div class="max-w-7xl w-full mx-auto sm:px-6 lg:px-8 pt-6 pb-2">
      <div class="shadow-lg border border-gray-300">
        <div
          class="w-full flex flex-col lg:flex-row justify-between border-b-[2px] border-gray-300"
        >
          <div class="relative w-full lg:w-[70%]">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
            >
              <!-- Heroicon name: solid/search -->
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              autocomplete="off"
              name="search"
              placeholder="What are you looking for?"
              class="h-14 shadow block w-full bg-white py-2 pl-10 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 sm:text-sm"
              type="text"
              #input
              (keyup)="this.state.refine(input.value)"
              [value]="this.state.query"
            />
          </div>
        </div>
      </div>
    </div>
  `
})
export class SearchBoxComponent
  extends TypedBaseWidget<SearchBoxWidgetDescription, SearchBoxConnectorParams>
  implements OnInit
{
  public state: SearchBoxWidgetDescription['renderState'] = {
    clear(): void {},
    isSearchStalled: false,
    query: '',
    refine(value: string): void {}
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('SearchBox');
  }

  public ngOnInit() {
    this.createWidget(connectSearchBox, {
      // instance options
    });
    super.ngOnInit();
  }
}
