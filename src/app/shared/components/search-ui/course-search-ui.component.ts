import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
import {
  CurrentOption,
  Filter,
  LocationSearchResult
} from '@shared/components/search/search.component';
import { environment } from '@environments/environment';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: environment.typesense.apiKey, // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: environment.typesense.host,
        port: environment.typesense.port,
        protocol: environment.typesense.protocol
      }
    ]
  },
  cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: 'title',
    perPage: 3
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

//Todo (zack): refactor the component to adapt the search
@Component({
  selector: 'se-course-search-ui',
  templateUrl: './course-search-ui.component.html'
})
export class CourseSearchUiComponent {
  config: any;
  @Input() hasLocation: boolean = false;

  filters: Filter[];
  currentOptions: CurrentOption[];
  isFiltersMobile: boolean;
  searchLoaded: boolean;
  isSelected: boolean = false;
  locationSearchResults: LocationSearchResult;

  @ViewChild('locationInput') locationInput: ElementRef;

  //Todo: (zack): Make a router state mapper for friendly search URLs
  constructor() {
    this.config = {
      indexName: 'courses',
      searchClient,
      routing: true
    };
  }
}
