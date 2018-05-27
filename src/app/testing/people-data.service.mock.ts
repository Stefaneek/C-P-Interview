import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { People } from '../people/shared/people.mode';

export var PEOPLE: People[] = [
    new People(1, "Meryl", "Galey", 23, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAA…xGKi4A4g/gZwNpTtA4gDRWxxGCQ/RXQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAA…xGKi4A4g/gZwNpTtA4gDRWxxGCQ/RXQAAAABJRU5ErkJggg=="),
    new People(2, "Andre", "Woollcott", 23, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAA…xGKi4A4g/gZwNpTtA4gDRWxxGCQ/RXQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAA…xGKi4A4g/gZwNpTtA4gDRWxxGCQ/RXQAAAABJRU5ErkJggg=="),
    new People(3, "Meryl", "Brea", 23, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAA…xGKi4A4g/gZwNpTtA4gDRWxxGCQ/RXQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAA…xGKi4A4g/gZwNpTtA4gDRWxxGCQ/RXQAAAABJRU5ErkJggg==")
]

export class PeopleDataServiceMock  {
    peopleArrayClone = PEOPLE.map(p => p.clone());
    lastPromise: Promise<any>;
    private subject = new BehaviorSubject<People>(null);
    people$: Observable<People> = this.subject.asObservable();
    private arraySubject = new BehaviorSubject<People[]>(new Array<People>());
    peopleArray$: Observable<People[]> = this.arraySubject.asObservable();
    private searchingSubject = new BehaviorSubject<boolean>(false);
    isSearching$: Observable<boolean> = this.searchingSubject.asObservable();
    constructor() {
    }

    getPeople() {
        return of(this.peopleArrayClone);
    }

    getPeopleById(id: number) {
        let people = this.peopleArrayClone.find(people => people.id == id);
        return of(people);
    }

    changePeople(people: People) {
        this.subject.next(people)
    }

    changePeopleArray(people: People[]) {
        this.arraySubject.next(people)
    }

    changeIsSearching(searching: boolean) {
        this.searchingSubject.next(searching)
    }

    get isSearching(): Observable<boolean> {
        return this.isSearching$;
    }

    get people(): Observable<People> {
        return this.people$;
    }

    get peopleArray(): Observable<People[]> {
        return this.peopleArray$;
    }
}