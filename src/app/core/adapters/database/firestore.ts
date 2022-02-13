import { Observable } from 'rxjs';
import { isEqual } from 'lodash/isEqual';
import { distinctUntilChanged, map } from 'rxjs/operators';
import {
  AngularFirestoreDocument,
  DocumentData,
  DocumentReference
} from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

type D = DocumentData;

//Investigate the effect on overloaded modules
function valueChanges(options?: {}): Observable<D | undefined>;
// eslint-disable-next-line no-redeclare
function valueChanges<K extends string>(options: {
  idField: K;
}): Observable<(D & { [T in K]: string }) | undefined>;
// eslint-disable-next-line no-redeclare
function valueChanges<K extends string>(
  options: { idField?: K } = {}
): Observable<D | undefined> {
  return this.snapshotChanges().pipe(
    map(({ payload }) =>
      options.idField
        ? ({
            ...payload.data(),
            ...{ [options.idField]: payload.id }
          } as D & { [T in K]: string })
        : payload.data()
    ),
    //Deep Equality
    distinctUntilChanged((a, b) => {
      return isEqual(a, b);
    })
  );
}

export function doc<T>(
  pathOrRef: string | DocumentReference<T>
): AngularFirestoreDocument<T> {
  let ref: DocumentReference<T>;
  if (typeof pathOrRef === 'string') {
    ref = this.firestore.doc(
      pathOrRef
    ) as firebase.firestore.DocumentReference<T>;
  } else {
    ref = pathOrRef;
  }
  const refInZone = this.schedulers.ngZone.run(() => ref);
  let afDoc = new AngularFirestoreDocument<T>(refInZone, this);
  // @ts-ignore
  afDoc.valueChanges = valueChanges;
  return afDoc;
}
