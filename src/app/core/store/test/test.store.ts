import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';
import { Test } from './test';

@Injectable({
  providedIn: 'root'
})
export class TestStore extends ObservableStore<Test> {
  constructor(private store: AngularFirestore) {
    super({ trackStateHistory: true, logStateChanges: true });
    store
      .collection<{ name: string }>('items')
      .valueChanges({ idField: 'zhou' })
      .subscribe((items) => {
        console.log(items);
        const initialState = {
          message: items[0].name
        };
        this.setState(initialState, TestStoreActions.InitializeState);
      });
  }
  get() {
    const message = this.getState().message;
    if (message) {
      console.log('Ok');
      return of(message);
    } else {
      console.log('Ok2');
      // call server and get data
      // assume async call here that returns observable
      return of(null);
    }
  }
  changeValue() {
    const newState = { message: 'Bruh' };
    this.setState(newState, TestStoreActions.ChangeState);
  }
}
export enum TestStoreActions {
  InitializeState = 'Initialize state',
  ChangeState = 'Change state message to bruh'
}
