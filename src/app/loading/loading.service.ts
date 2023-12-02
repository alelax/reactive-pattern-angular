import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoadingService {

  loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    console.log('loading service instance...')
  }

  /*
  * The loading indicator is going to be shown or hidden in a way that is
  * completely linked to the life cycle of the returned observable.
  *
  * The loading indicator will only be turned on when the observable
  * returned by showLoaderUntilCompleted method is subscribed to
  * */
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    // of(null) useful in order to create an observable chain
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap( () => obs$),
      finalize( () => this.loadingOff())
    )
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}