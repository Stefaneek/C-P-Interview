import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PeopleDataServiceMock, PEOPLE } from '../../testing/people-data.service.mock';
import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';
import { newEvent } from '../../testing/async-observable-helpers';
import { PeopleListComponent } from './people-list.component';
import { PeopleDataService } from '../shared/people-data.service';
import { RequestCacheService } from '../../http-interceptors/request-cache.service';


let component: PeopleListComponent;
let fixture: ComponentFixture<PeopleListComponent>;
let el: HTMLElement;
let select: HTMLElement;
let page: Page;
let service: PeopleDataService;
describe('PeopleListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleListComponent],
      imports: [AngularMaterialModule],
      providers: [
        { provide: PeopleDataService, useClass: PeopleDataServiceMock },
        { provide: MatDialog },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: RequestCacheService },
        { provide: ChangeDetectorRef }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    page = new Page();
    el = fixture.nativeElement.querySelector('.container--list');
    service = fixture.debugElement.injector.get(PeopleDataService);
    select = fixture.nativeElement.querySelector('.mat-select')
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('1st people should match 1st test people', () => {
    const expectedPeople = PEOPLE[0];
    fixture.detectChanges();
    expect(component.people[0].id).toBe(expectedPeople.id, '1st people should match 1st test people');
  });

  it('all people are displayed', () => {
    const expectedPeopleLength = PEOPLE.length;
    fixture.detectChanges();
    const listItem = el.querySelectorAll('.mat-list-item');
    expect(listItem.length).toBe(expectedPeopleLength, 'expect people length to be 3');
  });

  it('should navigate to selected people detail on click', () => {
    const expectedPeople = PEOPLE[1];
    fixture.detectChanges();
    const listItem = el.querySelectorAll('.mat-list-item');
    const selecteItem = listItem[1];
    selecteItem.dispatchEvent(newEvent('click'));

    // should have navigated
    expect(page.navSpy.calls.any()).toBe(true, 'navigate called');

    // composed people detail will be URL like 'people/2'
    const navArgs = page.navSpy.calls.first().args[0];
    expect(navArgs[0]).toContain('/people/2', 'nav to people detail URL');
  });

  it('People should be sort asc', () => {
    const expectedPeople = PEOPLE.sort(component.sortAsc)[0];
    fixture.detectChanges();
    component.sort("asc");
    expect(component.people[0].id).toBe(expectedPeople.id);
  });

  it('People should be sort dsc', () => {
    const expectedPeople = PEOPLE.sort(component.sortDsc)[0];
    fixture.detectChanges();
    component.sort("dsc");
    expect(component.people[0].id).toBe(expectedPeople.id);
  });

  it('People should be sort by default', () => {
    const expectedPeople = PEOPLE.sort()[0];
    fixture.detectChanges();
    component.sort("default");
    expect(component.people[0].id).toBe(expectedPeople.id);
  });

});

function createComponent() {
  page = new Page();
  fixture = TestBed.createComponent(PeopleListComponent);
  component = fixture.componentInstance;

  // change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  /** Hero line elements */
  peopleRows: HTMLLIElement[];

  /** Highlighted element */
  highlightDe: DebugElement;

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() {
    // Get the component's injected router and spy on it
    const router = fixture.debugElement.injector.get(Router);
    this.navSpy = spyOn(router, 'navigate');
  };
}
