import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';
import { Test } from './test';

@Injectable({
  providedIn: 'root'
})

export class TestService extends ObservableStore<Test> {

  constructor() {
    super({ trackStateHistory: true, logStateChanges: true });
    const initialState = {
      message: "Yaw o zineb zahiya"
    }
    this.setState(initialState, TestStoreActions.InitializeState);
  }
  get() {
    const message = this.getState().message;
    if (message) {
      console.log("Ok");
      return of(message);
    }
    else {
      console.log("Ok2");
      // call server and get data
      // assume async call here that returns observable
      return of(null);
    }
  }
  changeValue() {
    const newState = { message: "Bruh" };
    this.setState(newState, TestStoreActions.ChangeState);
  }
}
export enum TestStoreActions {
  InitializeState = 'Initialize state',
  ChangeState = "Change state message to bruh"
}