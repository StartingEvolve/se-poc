import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ObservableStore } from '@codewithdan/observable-store';
import { UserDocument } from '@se/shared/types/user-document';
export interface UserInterface {
  isLoggedIn: boolean;
  user: UserDocument;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ObservableStore<UserInterface> {
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    this.afAuth.onAuthStateChanged((user) => {
      // set up a subscription to always know the login status of the user
      if (user) {
        let emailLower = user.email.toLowerCase();
        this.afStore
          .doc<UserDocument>('users/' + emailLower)
          .valueChanges()
          .subscribe((data) => {
            const initialState = {
              isLoggedIn: true,
              user: data
            };
            this.setState(initialState, AuthStoreActions.InitializeState);
          });
      } else {
        const initialState = {
          isLoggedIn: false,
          user: null
        };
        this.setState(initialState, AuthStoreActions.InitializeState);
      }
    });
  }
}
export enum AuthStoreActions {
  InitializeState = 'Initialize state',
  LogoutState = 'Logout State'
}
