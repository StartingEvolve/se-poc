import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DatabaseSerice } from '@se/core/adapters/database/database';
import { timeStamp } from 'console';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';
import { VendorService } from '@core/services/vendor.service';
import {
  Config,
  OnVendorChangeConfig
} from '@se/core/store/vendor/vendor.store';
import TypesenseConfig from '@vendors/typesense/typesense.config';

export interface DropdownOption {
  value: string;
  label: string;
  isChecked: boolean;
}
export interface Filter {
  id: number;
  name: string;
  isOpen: boolean;
  options: DropdownOption[];
}
export interface CurrentOption {
  id: number;
  value: string;
  label: string;
}

export interface LocationSearchHit {
  document: {
    Code_postal: string;
    Nom_commune: string;
    id: string;
  };
  highlights?: {
    field: string;
    matchedToken: string[];
    snippet: string;
  }[];
  text_match?: number;
}

export interface LocationSearchResult {
  found: number;
  hits: any[];
}

@Component({
  selector: 'se-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent
  implements AfterViewInit, OnDestroy, OnVendorChangeConfig, OnInit
{
  filters: Filter[];
  EventSubscription: Subscription;
  currentOptions: CurrentOption[];
  isFiltersMobile: boolean;
  searchLoaded: boolean;
  isSelected: boolean = false;
  locationSearchResults: LocationSearchResult;
  configurations: Config;
  private storeSub: Subscription;
  private readonly libraries: string[];
  @ViewChild('locationInput') locationInput: ElementRef;
  constructor(private db: DatabaseSerice, private venService: VendorService) {
    this.libraries = ['typesense'];
    this.venService.getConfigObjects(this.libraries).then((config) => {
      this.configurations = config;
    });

    this.isFiltersMobile = false;
    this.currentOptions = [];
    this.filters = [
      {
        id: 1,
        name: 'Sort',
        isOpen: false,
        options: [
          {
            value: 'By date',
            label: 'By date',
            isChecked: false
          },
          {
            value: 'By views',
            label: 'By views',
            isChecked: false
          },
          {
            value: 'By popularity',
            label: 'By popularity',
            isChecked: false
          }
        ]
      },
      {
        id: 2,
        name: 'Public',
        isOpen: false,
        options: [
          {
            value: 'Student',
            label: 'Student',
            isChecked: false
          },
          {
            value: 'Professional',
            label: 'Professional',
            isChecked: false
          }
        ]
      }
    ];
  }
  ngOnInit(): void {
    this.venService.use(this.libraries);
  }
  seOnVendorChangeConfig() {
    const configMap = new Map();
    configMap.set('typesense', [new TypesenseConfig()]);
    return configMap;
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
            let search = {
              q: this.locationInput.nativeElement.value,
              query_by: 'Nom_commune,Code_postal',
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
                if (this.locationSearchResults.found === 0) {
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
  toggleDropdownById(id: number) {
    this.filters.forEach((item, ind) => {
      if (item.id === id) item.isOpen = !item.isOpen;
      else item.isOpen = false;
    });
  }
  toggleOptionById(object: { id: number; value: string; isMobile: boolean }) {
    this.filters
      .find((x) => x.id === object.id)
      .options.forEach((item) => {
        if (item.value == object.value) {
          if (!item.isChecked) {
            this.currentOptions.push({
              id: object.id,
              value: item.value,
              label: item.label
            });
          } else {
            this.currentOptions = this.currentOptions.filter(
              (item) => item.id != object.id || item.value != object.value
            );
          }
          item.isChecked = !item.isChecked;
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
  }
  setSearchValue(value: string) {
    console.log(value);
    this.locationInput.nativeElement.value = value;
    this.locationInput.nativeElement.blur();
    this.searchLoaded = false;
    this.isSelected = true;
  }
  resetFilterById(id: number) {
    this.filters
      .find((x) => x.id === id)
      .options.forEach((x) => (x.isChecked = false));
    this.currentOptions = this.currentOptions.filter((item) => item.id != id);
  }
  resetCurrentOptions() {
    this.currentOptions = [];
    this.filters.forEach((filter) => {
      filter.isOpen = false;
      filter.options.forEach((option) => {
        option.isChecked = false;
      });
    });
  }
  removeOption(id: number, value: string) {
    this.currentOptions = this.currentOptions.filter(
      (item) => item.id != id || item.value != value
    );
    this.filters
      .find((x) => x.id == id)
      .options.find((option) => option.value == value).isChecked = false;
    this.filters.forEach((filter) => {
      filter.isOpen = false;
    });
  }
  toggleIsFiltersMobile() {
    this.isFiltersMobile = !this.isFiltersMobile;
  }
  ngOnDestroy(): void {
    this.EventSubscription.unsubscribe();
  }
}
