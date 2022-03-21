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
        name: 'public_admitted',
        label: 'Publique Admis',
        isOpen: false,
        options: [
          {
            value: 'Étudiant',
            label: 'Étudiant',
            isChecked: false
          },
          {
            value: 'Salarié en poste',
            label: 'Salarié en poste',
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
        name: 'learning_mode',
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
            value: 'À distance',
            label: 'À distance',
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
            value: 'Éligible CPF',
            label: 'Éligible CPF',
            isChecked: false
          },
          {
            value: 'Éligible VAE',
            label: 'Éligible VAE',
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
