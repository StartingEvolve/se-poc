import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';

interface DropdownOption {
  value: string;
  label: string;
  isChecked: boolean;
}

export interface Filter {
  id: number;
  name: string;
  label: string;
  isOpen: boolean;
  options: DropdownOption[];
}

export interface FilterState {
  filters: Filter[];
}

@Injectable({
  providedIn: 'root'
})
export class FilterStore extends ObservableStore<FilterState> {
  currentRoute: string;
  filters: any;

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    this.filters = [
      {
        id: 1,
        name: 'public',
        label: 'Publique Admis',
        isOpen: false,
        options: [
          {
            value: 'Etudiant',
            label: 'Etudiant',
            isChecked: false
          },
          {
            value: 'Salarie en poste',
            label: 'Salarie en poste',
            isChecked: false
          },
          {
            value: 'Entreprise',
            label: 'Entreprise',
            isChecked: false
          },
          {
            value: "Demandeur d'emploi",
            label: "Demandeur d'emploi",
            isChecked: false
          }
        ]
      },
      {
        id: 2,
        name: 'learningMode',
        isOpen: false,
        label: "Mode d'apprentissage",
        options: [
          {
            value: 'En centre',
            label: 'En centre',
            isChecked: false
          },
          {
            value: 'En entreprise',
            label: 'En entreprise',
            isChecked: false
          },
          {
            value: 'A distance',
            label: 'A distance',
            isChecked: false
          },
          {
            value: 'En alternance',
            label: 'En alternance',
            isChecked: false
          }
        ]
      },
      {
        id: 3,
        name: 'eligibility',
        label: 'Spécifités',
        isOpen: false,
        options: [
          {
            value: 'Eligible CPF',
            label: 'Eligible CPF',
            isChecked: false
          },
          {
            value: 'Eligible VAE',
            label: 'Eligible VAE',
            isChecked: false
          }
        ]
      }
    ];
    this.setState(
      { filters: this.filters },
      FilterStoreActions.InitializeFilters
    );
  }

  getFiltersObservable() {
    return of(this.getState().filters);
  }

  getFilters() {
    return this.getState().filters;
  }

  addFilter(filter: Filter) {
    this.setState({}, FilterStoreActions.AddFilter);
  }

  updateFiltersByUrl(url: string) {
    if (url === '') {
      this.setState({
        filters: []
      });
    } else {
      this.setState(
        {
          filters: this.filters.map((f) => {
            return {
              ...f,
              options: f.options.map((option) => {
                return {
                  ...option,
                  isChecked: url.includes(option.value)
                };
              })
            };
          })
        },
        FilterStoreActions.UpdateFilter
      );
    }
  }
}

export enum FilterStoreActions {
  InitializeFilters = 'INITIALIZE_FILTER_STORE',
  AddFilter = 'ADD_FILTER',
  UpdateFilter = 'UPDATE_FILTER'
}
