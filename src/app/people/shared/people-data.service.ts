import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, finalize, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as Immutable from 'immutable';
import { List } from 'immutable';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { People } from './people.mode';
import { LoaderService } from '../../loader/shared/loader.service';
import { environment } from '../../../environments/environment';
import { ErrorComponent } from '../../error/error.component';

@Injectable({
  providedIn: 'root'
})
export class PeopleDataService {
  private subject = new BehaviorSubject<People>(null);
  person$: Observable<People> = this.subject.asObservable();
  private arraySubject = new BehaviorSubject<People[]>(new Array<People>());
  peopleArray$: Observable<People[]> = this.arraySubject.asObservable();
  constructor(private httpClient: HttpClient, private loaderService: LoaderService, public snackBar: MatSnackBar) { }

  getPeople(): Observable<People[]> {
    this.loaderService.show();
    return this.httpClient.get(`${environment.apiUrl}/people`).pipe(
      map((response: any): People[] => response),
      catchError(this.handleError<People[]>('getPeople')),
      finalize(() => {
        this.loaderService.hide();
      })
    )
  }

  getPeopleById(peopleId: number): Observable<People> {
    this.loaderService.show();
    return this.httpClient.get(`${environment.apiUrl}/people/${peopleId}`).pipe(
      map((response: any): People => response),
      catchError(this.handleError<People>(`getPeople id=${peopleId}`)),
      finalize(() => {
        this.loaderService.hide();
      })
    )
  }

  errorHandler(error: any): void {
    this.snackBar.openFromComponent(ErrorComponent, {
      duration: 1500,
      data: error.error
    });
  }

  changePerson(person: People) {
    this.subject.next(person)
  }

  changePeopleArray(people: People[]) {
    this.arraySubject.next(people)
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error); // log to console instead
      this.snackBar.openFromComponent(ErrorComponent,{
        duration: 1500,
        data: error.error.error
      });

      this.loaderService.hide();
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${error.error}"`;

      throw new Error(`${operation} failed: ${message}`);
    };
  }

  get person(): Observable<People> {
    return this.person$;
  }

  get peopleArray(): Observable<People[]> {
    return this.peopleArray$;
  }
}
