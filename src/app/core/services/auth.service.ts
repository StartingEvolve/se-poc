import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private tService: TranslateService,
    private http: HttpClient
  ) {}

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
      })
      .catch((error): any => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, code: error.code };
      });
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    await this.afAuth.signInWithRedirect(provider);
  }

  updateUserDataByGoogle(user, profile: any) {
    let emailLower = user.email.toLowerCase();
    this.tService.setDefaultLang(profile.locale);
    this.afStore
      .doc('/users/' + emailLower) // on a successful signup, create a document in 'users' collection with the new user's info
      .set(
        {
          uid: user.uid,
          accountType: 'endUser',
          displayName: user.displayName,
          displayName_lower: user.displayName.toLowerCase(),
          email: user.email,
          email_lower: emailLower,
          language: profile.locale
        },
        { merge: true }
      );
  }

  updateUserData(data): Promise<any> {
    let email_lower = data.email;
    return this.afStore.doc('/users/' + email_lower).set(data, { merge: true });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        this.afStore
          .doc('/users/' + emailLower) // on a successful signup, create a document in 'users' collection with the new user's info
          .set({
            accountType: user.accountType ? user.accountType : 'endUser',
            displayName: user.displayName,
            displayName_lower: user.displayName.toLowerCase(),
            email: user.email,
            email_lower: emailLower
          });
        result.user.sendEmailVerification(); // immediately send the user a verification email
      })
      .catch((error): any => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, code: error.code };
      });
  }

  resetPassword(email: string): Promise<any> {
    return this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Auth Service: reset password success');
        // this.router.navigate(['/amount']);
      })
      .catch((error) => {
        console.log('Auth Service: reset password error...');
        console.log(error.code);
        console.log(error);
        if (error.code) return error;
      });
  }

  resendEmailVerification(email: string): Promise<any> {
    return this.getCurrentUser()
      .then((result) => {
        result.sendEmailVerification();
      })
      .catch((error): any => {
        if (error.code) return { isValid: false, code: error.code };
      });
  }

  logoutUser(): Promise<void> {
    return this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/']); // when we log the user out, navigate them to home
      })
      .catch((error) => {
        console.log('Auth Service: logout error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return error;
      });
  }

  verifyEmailExistence(email) {
    return this.http
      .get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=9b277276eec44d71a6e419067cf37d27&email=${email}`
      )
      .toPromise();
  }

  setUserInfo(payload: object) {
    console.log('Auth Service: saving user info...');
    this.afStore
      .collection('users')
      .add(payload)
      .then(function (res) {
        console.log('Auth Service: setUserInfo response...');
        console.log(res);
      });
  }

  getCurrentUser() {
    return this.afAuth.currentUser; // returns user object for logged-in users, otherwise returns null
  }
}
