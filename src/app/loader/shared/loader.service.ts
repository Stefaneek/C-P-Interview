import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()

export class LoaderService {

    private loaderSubject = new BehaviorSubject<boolean>(null);

    loaderState: Observable<boolean> = this.loaderSubject.asObservable();

    constructor() { }

    show() {
        this.loaderSubject.next(true);
    }

    hide() {
        this.loaderSubject.next(false);
    }

    get loader(){
        return this.loaderState
    }
}