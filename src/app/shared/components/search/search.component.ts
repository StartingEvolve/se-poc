import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';
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
export class SearchComponent implements AfterViewInit, OnDestroy {
  filters: Filter[];
  EventSubscription: Subscription;
  currentOptions: currentOption[];
  isFiltersMobile: boolean;
  @ViewChild('input') input: ElementRef;
  constructor() {
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
  ngAfterViewInit(): void {
    this.EventSubscription = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(250),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.input.nativeElement.value);
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
  toggleOptionById(object: { id: number; value: string }) {
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
            console.log(this.currentOptions);
          } else {
            this.currentOptions = this.currentOptions.filter(
              (item) => item.id != object.id || item.value != object.value
            );
          }
          item.isChecked = !item.isChecked;
        }
      });
    this.filters.forEach((filter) => {
      filter.isOpen = false;
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
