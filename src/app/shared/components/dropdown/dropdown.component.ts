import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

export interface dropdownOption {
  value: string;
  label: string;
  isChecked: boolean;
}
export interface filter {
  id: number;
  name: string;
  isOpen: boolean;
  options: dropdownOption[];
}

@Component({
  selector: 'se-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements DoCheck {
  @Input() filter: filter;
  @Output() toggleDropdownEvent = new EventEmitter<number>();
  @Output() toggleOptionEvent = new EventEmitter<{
    id: number;
    value: string;
    isMobile: boolean;
  }>();
  @Output() resetFilterEvent = new EventEmitter<number>();
  number: number;
  constructor() {}
  toggleDropdown(id: number) {
    this.toggleDropdownEvent.emit(id);
  }
  toggleOption(id: number, value: string, isMobile: boolean) {
    this.toggleOptionEvent.emit({ id, value, isMobile });
  }
  resetFilter(id: number) {
    this.resetFilterEvent.emit(id);
  }
  ngDoCheck(): void {
    this.number = this.filter?.options.filter(
      (x) => x.isChecked == true
    ).length;
    if (this.number == 0) {
      this.number = null;
    }
  }
}
