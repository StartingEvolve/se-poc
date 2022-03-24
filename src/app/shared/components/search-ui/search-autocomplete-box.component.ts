import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { LocationSearchResult } from '@shared/components/search/search.component';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';
import { VendorService } from '@core/services/vendor.service';
import { Config, OnVendorChangeConfig } from '@core/store/vendor/vendor.store';
import TypesenseConfig from '@vendors/typesense/typesense.config';

//The library's search client only supports single search box instances
//See more : https://discourse.algolia.com/t/setting-up-instantsearch-with-multiple-search-boxes/11375/3
//Right now we're going to stick with low level access with typesense.js
//Todo (zack) refactor the component by using the same client instance & use templates for reusability
@Component({
  selector: 'se-search-auto-box',
  template: ` <input
      autocomplete="off"
      name="search"
      placeholder="Où ?"
      [class.selectedValue]="isSelected"
      class="h-14 shadow block w-full bg-white py-2 pl-10 lg:w-full lg:border-0 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 sm:text-sm mt-1 lg:mt-0"
      id="search"
      type="text"
      #locationInput
    />
    <ul
      *ngIf="searchLoaded"
      class="origin-top-right shadow absolute right-0 z-50 bg-white border border-gray-100 w-full lg:mt-0"
    >
      <li
        *ngFor="let item of locationSearchResults.hits"
        (click)="setSearchValue(item.document['Nom_commune'])"
        class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-50 hover:text-gray-900"
      >
        <span
          [innerHTML]="
            item.highlights[0].field === 'Nom_commune'
              ? item.highlights[0].snippet
              : (item.document['Nom_commune'] | sanitizeHtml)
          "
        ></span>
        <!--        - -->
        <!--        <span-->
        <!--          [innerHTML]="-->
        <!--            item.highlights[0].field === 'Code_postal'-->
        <!--              ? item.highlights[0].snippet-->
        <!--              : (item.document['Code_postal'] | sanitizeHtml)-->
        <!--          "-->
        <!--        ></span>-->
      </li>
    </ul>`,
  styles: [
    '.selectedValue {\n' +
      '  @apply text-indigo-600 font-bold text-lg;\n' +
      '}\n'
  ]
})
export class SearchAutocompleteBoxComponent
  implements AfterViewInit, OnDestroy, OnVendorChangeConfig, OnInit
{
  locationSearchResults: LocationSearchResult;
  configurations: Config;
  EventSubscription: Subscription;
  searchLoaded: boolean;
  isSelected: boolean = false;
  @ViewChild('locationInput') locationInput: ElementRef;
  @Output() RefineEvent = new EventEmitter<string>();
  @Input()
  clearRefinementEvent: EventEmitter<string> = new EventEmitter();

  private storeSub: Subscription;
  private readonly libraries: string[];

  constructor(private venService: VendorService) {
    this.libraries = ['typesense'];
    this.venService.getConfigObjects(this.libraries).then((config) => {
      this.configurations = config;
    });
  }

  setSearchValue(value: string) {
    console.log(value);
    this.locationInput.nativeElement.value = value;
    this.locationInput.nativeElement.blur();
    this.searchLoaded = false;
    this.isSelected = true;
    this.RefineEvent.emit(value);
  }

  seOnVendorChangeConfig() {
    const configMap = new Map();
    configMap.set('typesense', [new TypesenseConfig()]);
    return configMap;
  }

  ngOnInit(): void {
    this.venService.use(this.libraries);
    this.clearRefinementEvent.subscribe(() => this.clearRefinement());
  }

  clearRefinement() {
    this.locationInput.nativeElement.value = '';
  }

  ngAfterViewInit(): void {
    //It's important to subscribe at the right lifecycle hook, as a rule of thumb when loading
    //scripts that interacts with the DOM, subscription must trigger the configuration only after
    //the View is initialized (Component DOM data structure is built)
    this.storeSub = this.venService.watchVendorChanges(
      this,
      this.libraries,
      this.seOnVendorChangeConfig
    );

    //Here we are searching through the courses' collection rather than the raw France
    //It's useless to query a 40k records collection when we have fewer data in another collection
    this.EventSubscription = fromEvent(
      this.locationInput.nativeElement,
      'keyup'
    )
      .pipe(
        filter(Boolean),
        debounceTime(200),
        distinctUntilChanged(),
        tap((text) => {
          if (this.locationInput.nativeElement.value === '') {
            this.searchLoaded = false;
            this.isSelected = false;
          } else {
            //Todo (zack) : I need to deal with multiple location fields when displaying data
            let search = {
              q: this.locationInput.nativeElement.value,
              query_by: 'Nom_commune',
              per_page: 5
            };
            this.configurations
              .get('typesense')[0]
              .getClient()
              .collections('france')
              .documents()
              .search(search)
              .then((searchResults) => {
                console.log(searchResults);
                this.locationSearchResults = searchResults;
                if (searchResults.found === 0) {
                  this.searchLoaded = false;
                  this.isSelected = false;
                } else {
                  this.searchLoaded = true;
                  this.isSelected = false;
                }
              });
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.EventSubscription.unsubscribe();
  }
}
