import {
  Component,
  Inject,
  forwardRef,
  Optional,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  OnInit
} from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex
} from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import { Filter } from '@shared/components/search/search.component';

@Component({
  selector: 'se-refinement-list',
  template: `
    <div class="lg:flex hidden items-center rounded hover:bg-gray-200">
      <div class="relative inline-block text-left p-2">
        <div>
          <button
            type="button"
            class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            id="menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span (click)="toggleDropdown(filter.id)">{{
              filter.name | translate
            }}</span>
            <span
              *ngIf="number"
              (click)="resetFilter(filter.id)"
              class="text-white pl-2 pr-5 relative text-xs ml-2 bg-green-400 hover:bg-green-500 rounded-sm py-[1px]"
              >{{ number }}
              <mat-icon class="absolute right-0 text-xs">close</mat-icon>
            </span>
            <img
              *ngIf="!filter.isOpen && !number"
              (click)="toggleDropdown(filter.id)"
              class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              src="/assets/icons/chevron-down.svg"
              alt=""
              srcset=""
            />
            <img
              *ngIf="filter.isOpen && !number"
              (click)="toggleDropdown(filter.id)"
              class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              src="/assets/icons/chevron-up.svg"
              alt=""
              srcset=""
            />
          </button>
        </div>

        <div
          *ngIf="filter.isOpen"
          class="z-50 origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div role="none">
            <div
              *ngFor="let option of state.items; let i = index"
              class="relative cursor-pointer font-medium text-gray-900 block px-4 py-2 text-sm hover:bg-gray-100"
              [class.active]="option.isRefined"
              (click)="toggleOption(filter.id, option.value, false)"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
            >
              <span *ngIf="option.label !== ''"
                >{{ option.label }} ({{ option.count }})</span
              >
              <span
                *ngIf="option.isRefined"
                class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
              >
                <img src="/assets/icons/check.svg" alt="" srcset="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lg:hidden block border-t border-gray-200 px-4 py-2">
      <h3 class="-mx-2 -my-3 flow-root">
        <!-- Expand/collapse section button -->
        <button
          (click)="toggleDropdown(filter.id)"
          type="button"
          class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
          aria-controls="filter-section-mobile-0"
          aria-expanded="false"
        >
          <span>{{ filter.name | translate }}</span>
          <span class="ml-6 flex items-center">
            <img
              *ngIf="!filter.isOpen"
              class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              src="/assets/icons/chevron-down.svg"
              alt=""
              srcset=""
            />
            <img
              *ngIf="filter.isOpen"
              class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              src="/assets/icons/chevron-up.svg"
              alt=""
              srcset=""
            />
          </span>
        </button>
      </h3>
      <!-- Filter section, show/hide based on section state. -->
      <div class="pt-2" id="filter-section-mobile-0">
        <div *ngIf="filter.isOpen">
          <div
            *ngFor="let option of state.items"
            (click)="toggleOption(filter.id, option.value, true)"
            role="menuitem"
            tabindex="-1"
            class="flex items-center py-2"
          >
            <input
              *ngIf="option.label !== ''"
              id="filter-mobile-color-0"
              name="color[]"
              value="white"
              type="checkbox"
              [checked]="option.isRefined"
              class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label
              *ngIf="option.label !== ''"
              for="filter-mobile-color-0"
              class="ml-3 min-w-0 flex-1 text-gray-500"
            >
              {{ option.label }} ({{ option.count }})
            </label>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RefinementListComponent
  extends TypedBaseWidget<
    RefinementListWidgetDescription,
    RefinementListConnectorParams
  >
  implements DoCheck, OnInit
{
  @Input() filter: Filter;
  @Output() toggleDropdownEvent = new EventEmitter<number>();
  @Output() toggleOptionEvent = new EventEmitter<{
    id: number;
    value: string;
    isMobile: boolean;
  }>();
  @Output() resetFilterEvent = new EventEmitter<number>();
  number: number;
  public state: RefinementListWidgetDescription['renderState'] = {
    items: [],
    refine(value: string): void {},
    createURL: undefined,
    isFromSearch: false,
    searchForItems: undefined,
    isShowingMore: false,
    canToggleShowMore: false,
    toggleShowMore: undefined,
    canRefine: false,
    hasExhaustiveItems: false,
    sendEvent: undefined
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('RefinementList');
  }

  ngOnInit() {
    this.createWidget(connectRefinementList, {
      attribute: this.filter.name
    });
    super.ngOnInit();
  }

  toggleDropdown(id: number) {
    this.toggleDropdownEvent.emit(id);
  }

  toggleOption(id: number, value: string, isMobile: boolean) {
    console.log({ id, value, isMobile });
    this.state.refine(value);
    this.toggleOptionEvent.emit({ id, value, isMobile });
  }

  resetFilter(id: number) {
    this.resetFilterEvent.emit(id);
  }

  ngDoCheck(): void {
    this.number = this.filter?.options.filter((x) => x.isChecked).length;
    if (this.number == 0) {
      this.number = null;
    }
  }
}
