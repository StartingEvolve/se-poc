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
  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });

    const initialState = {
      filters: [
        {
          id: 1,
          name: 'public',
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
          options: [
            {
              value: 'En centre',
              label: 'En centre',
              isChecked: false
            },
            {
              value: 'Salarie en poste',
              label: 'Salarie en poste',
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
          isOpen: false,
          options: [
            {
              value: 'Eligible CPF',
              label: 'Eligible CPF',
              isChecked: false
            },
            {
              value: 'Eligible VAE',
              label: 'Salarie en poste',
              isChecked: false
            }
          ]
        }
      ]
    };

    this.setState(initialState, FilterStoreActions.InitializeFilters);
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

  updateFilters(filters: Filter[]) {
    this.setState({ filters }, FilterStoreActions.UpdateFilter);
  }
}

export enum FilterStoreActions {
  InitializeFilters = 'INITIALIZE_FILTER_STORE',
  AddFilter = 'ADD_FILTER',
  UpdateFilter = 'UPDATE_FILTER'
}
