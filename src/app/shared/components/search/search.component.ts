import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy
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

export interface dropdownOption {
  value: string;
  label: string;
  isChecked: boolean;
}
export interface Filter {
  id: number;
  name: string;
  isOpen: boolean;
  options: dropdownOption[];
}
export interface currentOption {
  id: number;
  value: string;
  label: string;
}

@Component({
  selector: 'se-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent
  implements AfterViewInit, OnDestroy, OnVendorChangeConfig
{
  filters: Filter[];
  EventSubscription: Subscription;
  currentOptions: currentOption[];
  isFiltersMobile: boolean;
  searchLoaded: boolean;
  results: any;
  configurations: Config;
  private storeSub: Subscription;
  private readonly libraries: string[];
  @ViewChild('input') input: ElementRef;
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

    this.EventSubscription = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(250),
        distinctUntilChanged(),
        tap((text) => {
          if (this.input.nativeElement.value === '') {
            this.searchLoaded = false;
          } else {
            let search = {
              q: 'Cal',
              query_by: 'Nom_commune'
            };
            setTimeout(() => {
              this.configurations
                .get('typesense')[0]
                .collections('france')
                .documents()
                .search(search)
                .then(function (searchResults) {
                  console.log(searchResults);
                });
            }, 1000);
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
