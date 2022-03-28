import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { completeObject } from '@se/features/provider/views/stepper/stepper.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(
    private db: AngularFirestore,
    private afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  getProviderById(id: string): Observable<any> {
    return this.db.doc('providers/' + id).valueChanges();
  }

  //Todo (zack) refactor later
  addProvider(provider: completeObject, isOrganisation: boolean) {
    let user = {
      email: provider.account.email,
      password: provider.account.password,
      accountType: isOrganisation ? 'organisation' : 'independent'
    };

    let providerDoc = {};
    if (user.accountType === 'organisation') {
      providerDoc = {
        name: provider.organisation.name,
        image: provider.organisation.photoURL,
        industry: provider.professional.domain,
        courseId: []
      };

      //Todo (zack) : Refactor API Endpoints
      //Todo (bobbhy) : Upload images to file strorage
      console.log(user);
      console.log(providerDoc);
      this.http
        .post(environment.adminAPI.BASE_URL + '/providers', {
          user,
          providerDoc: {
            ...providerDoc,
            ...user
          }
        })
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      return;
    }
  }

  getCourseById(id: string): Observable<any> {
    return this.db.doc('courses_info/' + id).valueChanges();
  }
}
