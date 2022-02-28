import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ObservableStore } from '@codewithdan/observable-store';
import { UserDocument } from '@se/shared/types/user-document';
import { Subscription } from 'rxjs';
import { DatabaseSerice } from '@core/adapters/database/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface UserInterface {
  isLoggedIn: boolean;
  isEmailVerified?: boolean;
  user: UserDocument;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ObservableStore<UserInterface> {
  docsubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    //Context : See here https://ensak.notion.site/Optimization-Refactoring-Ideas-b716a74fd7f94ee2a496a3db46320214
    //Todo (zack): Decouple Snapshot listeners from our stores, preferably we would have a gateway orchestrating subscription (listens)
    this.afAuth.onAuthStateChanged((user) => {
      // set up a subscription to always know the login status of the user
      if (user) {
        let emailLower = user.email.toLowerCase();
        this.docsubscription = this.afStore
          .doc<UserDocument>('users/' + emailLower)
          .valueChanges()
          .subscribe((data) => {
            const initialState = {
              isLoggedIn: true,
              isEmailVerified: user.emailVerified ?? false,
              user: data
            };
            this.setState(initialState, AuthStoreActions.UpdateState);
          });
      } else {
        if (this.docsubscription) {
          //Make sure unsubscribe to avoid unexpected behaviors, this why having a subscription orchestrator (a fancy name for a garbage collector) would be ideal
          this.docsubscription.unsubscribe();
        }
        const initialState = {
          isLoggedIn: false,
          user: null
        };

        this.setState(initialState, AuthStoreActions.InitialState);
      }
    });
  }
}

export enum AuthStoreActions {
  InitialState = 'Initial state',
  UpdateState = 'Update State'
}
