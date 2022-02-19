import {
  Component,
  Inject,
  forwardRef,
  Optional,
  OnInit,
  ViewChildren,
  QueryList,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit,
  ViewRef,
  EventEmitter
} from '@angular/core';
import {
  NgAisInstantSearch,
  NgAisIndex,
  TypedBaseWidget
} from 'angular-instantsearch';
import connectSearchBox, {
  SearchBoxWidgetDescription,
  SearchBoxConnectorParams
} from 'instantsearch.js/es/connectors/search-box/connectSearchBox';
import { RefinementListComponent } from '@shared/components/search-ui/refinement-list.component';
import { Filter, FilterStore } from '@core/store/filter/filter.store';
import Timeout = NodeJS.Timeout;

interface CurrentOption {
  id: number;
  value: string;
  label: string;
}

const noop = (): void => {};
const parseNumberInput = (input?: number | string): number => {
  return typeof input === 'string' ? parseInt(input, 10) : input;
};

@Component({
  selector: 'se-searchbox',
  template: `
    <ng-template #tpl>
      <ng-container *ngFor="let filter of filters">
        <se-refinement-list
          #Filter
          [filter]="filter"
          (toggleDropdownEvent)="toggleDropdownById($event)"
          (toggleOptionEvent)="toggleOptionById($event)"
          (resetFilterEvent)="resetFilterById($event)"
        >
        </se-refinement-list>
      </ng-container>
    </ng-template>
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
          <div
            class="relative w-full lg:w-[30%] bg-white lg:border-l-2 lg:border-t-0 border-t-2"
          >
            <div
              class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
            >
              <img
                src="/assets/icons/location.svg"
                class="h-5 w-5"
                alt=""
                srcset=""
              />
            </div>

            <se-headless-refinement [RefineEvent]="RefineParentEvent">
              <ng-template>
                <se-search-auto-box
                  (RefineEvent)="forwardEvent($event)"
                ></se-search-auto-box>
              </ng-template>
            </se-headless-refinement>
            <div
              (click)="toggleIsFiltersMobile()"
              class="absolute md:right-5 sm:right-4 top-3 right-4 inset-y-0 lg:hidden"
            >
              <mat-icon class="text-2xl">filter_alt</mat-icon>
            </div>
          </div>
        </div>
        <div
          class="w-full bg-white relative h-12 hidden lg:flex justify-start p-4 items-center space-x-4"
        >
          <ng-container #vcDesktop></ng-container>
        </div>
        <div
          *ngIf="currentOptions.length !== 0"
          class="bg-[#f5f5f5] relative flex items-center space-x-1 lg:space-x-6
         py-2 pl-4"
        >
          <h2>Filters</h2>
          <div class="flex flex-wrap gap-2 items-center space-x-1 pl-4 mr-2">
            <div
              *ngFor="let currentOption of currentOptions"
              class="relative p-1 pl-2 pr-5 text-xs bg-gray-200 rounded-full"
            >
              {{ currentOption.label | translate }}
              <span
                (click)="removeOption(currentOption.id, currentOption.value)"
                class="absolute inset-y-0 right-[-8px] flex items-center pr-2 cursor-pointer"
              >
                <mat-icon
                  class="absolute right-0 top-1 text-xs hover:text-gray-500"
                  >close</mat-icon
                >
              </span>
            </div>
          </div>
          <div
            class="cursor-pointer lg:block hidden absolute right-1"
            (click)="resetCurrentOptions()"
          >
            <se-clear-refinements></se-clear-refinements>
          </div>
        </div>
      </div>
    </div>
    <div
      *ngIf="isFiltersMobile"
      class="fixed inset-0 flex z-[10000] lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div
        (click)="toggleIsFiltersMobile()"
        class="fixed inset-0 bg-black bg-opacity-25"
        aria-hidden="true"
      ></div>
      <div
        class="ml-auto relative overflow-x-hidden md:max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto border-b-2 border-gray-500"
      >
        <div class="px-4 flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            (click)="toggleIsFiltersMobile()"
            class="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
          >
            <span class="sr-only">Close menu</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h3 class="sr-only">Categories</h3>

        <!-- Todo: (zack): create a filter store to dispatch filter states        -->
        <ng-container #vcMobile></ng-container>
      </div>
    </div>
  `
})
//Todo (zack) : Debounce the search box & Add a filter service
//Todo (zack) : Investigate loading state of the view containers and its impact on the hit view
export class SearchBoxComponent
  extends TypedBaseWidget<SearchBoxWidgetDescription, SearchBoxConnectorParams>
  implements OnInit, AfterViewInit
{
  @ViewChildren('Filter') filtersList: QueryList<RefinementListComponent>;
  containerKillSwtich: any[] = [];
  public state: SearchBoxWidgetDescription['renderState'] = {
    clear(): void {},
    isSearchStalled: false,
    query: '',
    refine(value: string): void {}
  };

  filters: Filter[];
  currentOptions: CurrentOption[];
  isFiltersMobile: boolean;
  isSelected: boolean = false;

  RefineParentEvent: EventEmitter<any> = new EventEmitter();

  //Loading components dynamically to switch between desktop and mobile views without losing consistency (view state)
  @ViewChild('vcDesktop', { read: ViewContainerRef })
  vcDesktop: ViewContainerRef;
  @ViewChild('vcMobile', { read: ViewContainerRef }) vcMobile: ViewContainerRef;
  @ViewChild('tpl') tpl: TemplateRef<any>;
  view: ViewRef;

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    public filterStore: FilterStore
  ) {
    super('SearchBox');
    this.currentOptions = [];
    this.filters = this.filterStore.getFilters();
  }

  public ngOnInit() {
    this.createWidget(connectSearchBox, {
      // instance options
    });
    super.ngOnInit();
    console.log(this.state);
  }

  public ngAfterViewInit() {
    this.view = this.tpl.createEmbeddedView(this.filters);

    this.vcDesktop.insert(this.view);
  }

  toggleDropdownById(id: number) {
    this.filters.forEach((item, ind) => {
      if (item.id === id) item.isOpen = !item.isOpen;
      else item.isOpen = false;
    });
  }

  toggleOptionById(object: { id: number; value: string; isMobile: boolean }) {
    console.log(object.value);
    this.filters
      .find((x) => x.id === object.id)
      .options.forEach((it) => {
        if (it.value == object.value) {
          if (!it.isChecked) {
            this.currentOptions.push({
              id: object.id,
              value: it.value,
              label: it.label
            });
          } else {
            this.currentOptions = this.currentOptions.filter(
              (item) => item.id != object.id || item.value != object.value
            );
          }
          it.isChecked = !it.isChecked;
        }
      });
    this.filters.forEach((filter) => {
      if (object.isMobile) {
        if (filter.id !== object.id) {
          filter.isOpen = false;
        }
      } else {
        filter.isOpen = false;
      }
    });
    this.filterStore.updateFilters(this.filters);
  }

  resetFilterById(id: number) {
    this.filters
      .find((x) => x.id === id)
      .options.forEach((x) => (x.isChecked = false));
    this.currentOptions = this.currentOptions.filter((item) => item.id != id);
    this.filterStore.updateFilters(this.filters);
  }

  resetCurrentOptions() {
    this.currentOptions = [];
    this.filters.forEach((filter) => {
      filter.isOpen = false;
      filter.options.forEach((option) => {
        option.isChecked = false;
      });
    });
    this.filterStore.updateFilters(this.filters);
  }

  removeOption(id: number, value: string) {
    this.filtersList.toArray()[id - 1].state.refine(value);
    this.currentOptions = this.currentOptions.filter(
      (item) => item.id != id || item.value != value
    );
    this.filters
      .find((x) => x.id == id)
      .options.find((option) => option.value == value).isChecked = false;
    this.filters.forEach((filter) => {
      filter.isOpen = false;
    });
    this.filterStore.updateFilters(this.filters);
  }

  //Todo (zack): Fix view insertion conflict when toggle is called with a fast rate
  toggleIsFiltersMobile() {
    this.isFiltersMobile = !this.isFiltersMobile;
    if (!this.containerKillSwtich.length) {
      this.containerKillSwtich.forEach((id: Timeout, index) => {
        if (id) {
          clearTimeout(id);
          this.containerKillSwtich.splice(index, 1);
        }
      });
    }
    if (this.isFiltersMobile) {
      this.vcDesktop.detach(this.vcDesktop.indexOf(this.view));
      this.containerKillSwtich.push(
        setTimeout(() => {
          this.view = this.vcMobile.insert(this.view);
        }, 500)
      );
    } else {
      this.vcMobile.detach(this.vcMobile.indexOf(this.view));
      this.containerKillSwtich.push(
        setTimeout(() => {
          this.view = this.vcDesktop.insert(this.view);
        }, 500)
      );
    }
  }

  //A cool way to forward events from ng-template child to its container
  //https://stackoverflow.com/a/57435270/11420791
  forwardEvent(value: any) {
    this.RefineParentEvent.next(value);
  }
}
