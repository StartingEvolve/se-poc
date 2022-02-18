import { Component, Inject, forwardRef, Optional } from '@angular/core';
import {
  TypedBaseWidget,
  NgAisInstantSearch,
  NgAisIndex
} from 'angular-instantsearch';

import connectClearRefinements, {
  ClearRefinementsWidgetDescription,
  ClearRefinementsConnectorParams
} from 'instantsearch.js/es/connectors/clear-refinements/connectClearRefinements';

const noop = (): void => {};

@Component({
  selector: 'se-clear-refinements',
  template: ` <mat-icon (click)="state.refine()" color="warn">
    delete</mat-icon
  >`
})
export class ClearRefinementsComponent extends TypedBaseWidget<
  ClearRefinementsWidgetDescription,
  ClearRefinementsConnectorParams
> {
  public state: ClearRefinementsWidgetDescription['renderState'] = {
    hasRefinements: false,
    canRefine: false,
    refine: noop,
    createURL: () => ''
  };

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch
  ) {
    super('ClearRefinements');
  }

  ngOnInit() {
    this.createWidget(connectClearRefinements, {
      // instance options
    });
    super.ngOnInit();
  }
}
