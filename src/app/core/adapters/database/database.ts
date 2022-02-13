import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { doc } from '@core/adapters/database/firestore';

//At the time, our adapter isn't really an interface between Firestore and the application,
//We need to use Firestore API more casually before creating a general interface adapter.
//That's why we're just going to inject our custom functionality into the class instance
interface IDatabase {}

//We are creating our wrapper rather than customizing the class itself because AngularFire
//use DI mechanism in its modules, hence replicating the module construction needs more thorough
//investigations on how their mechanism is implemented which is a waste of time.
@Injectable({
  providedIn: 'root'
})
export class DatabaseSerice {
  constructor(private afStore: AngularFirestore) {
    afStore.doc = doc;
  }

  getDatabase() {
    return this.afStore;
  }
}
