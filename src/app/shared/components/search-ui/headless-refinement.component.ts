import {
  Component,
  Inject,
  forwardRef,
  Optional,
  OnInit,
  TemplateRef,
  ContentChild,
  Input,
  EventEmitter
} from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex
} from 'angular-instantsearch';

import connectRefinementList, {
  RefinementListWidgetDescription,
  RefinementListConnectorParams
} from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';

@Component({
  selector: 'se-headless-refinement',
  template: ` <ng-container
    *ngTemplateOutlet="template; context: state"
  ></ng-container>`
})
export class HeadlessRefinementComponent
  extends TypedBaseWidget<
    RefinementListWidgetDescription,
    RefinementListConnectorParams
  >
  implements OnInit
{
  @ContentChild(TemplateRef, { static: false })
  public template?: TemplateRef<any>;

  @Input()
  RefineEvent: EventEmitter<string> = new EventEmitter();
  public lastRefinement = '';

  public state: RefinementListWidgetDescription['renderState'] = {
    items: [],
    refine(value: string): void {},
    createURL: undefined,
    isFromSearch: false,
    searchForItems: undefined,
    isShowingMore: false,
    canToggleShowMore: false,
    toggleShowMore: undefined,
    canRefine: false,
    hasExhaustiveItems: false,
    sendEvent: undefined
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('RefinementList');
  }

  ngOnInit() {
    this.createWidget(connectRefinementList, {
      attribute: 'location'
    });
    super.ngOnInit();
    this.RefineEvent.subscribe((value) => this.refineSearch(value));
  }

  //A hacky way to emulate the functionality of toggling refinements
  refineSearch(value: string) {
    this.state.refine(this.lastRefinement);
    this.state.refine(value);
    this.lastRefinement = value;
  }
}
