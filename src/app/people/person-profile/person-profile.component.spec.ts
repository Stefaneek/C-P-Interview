import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { PEOPLE, PeopleDataServiceMock } from '../../testing/people-data.service.mock';
import { PersonProfileComponent } from './person-profile.component';
import { PeopleDataService } from '../shared/people-data.service';
import { LoaderService } from '../../loader/shared/loader.service';


let fixture: ComponentFixture<PersonProfileComponent>;
let component: PersonProfileComponent;
let service: PeopleDataService
let el: HTMLElement;
let select: HTMLElement;
let page: Page;
let spy: jasmine.Spy;
describe('PersonProfileComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonProfileComponent],
      imports: [AngularMaterialModule],
      providers: [
        { provide: PeopleDataService, useClass: PeopleDataServiceMock },
        {
          provide: MatDialogRef, useValue: {
            close: (dialogResult: any) => { }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: 1 },
        { provide: LoaderService, useClass: LoaderService}
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PersonProfileComponent);
    service = fixture.debugElement.injector.get(PeopleDataService);
    spy = spyOn(service, 'changePeople');
    component = fixture.componentInstance;
    page = new Page();
    el = fixture.nativeElement.querySelector('.dialog-content');
  }));

  it('should show header  ', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('People profile', '"People profile"');
  });

  it('should show people after component initialized', fakeAsync(() => {
    const expectedPeople = PEOPLE[0];
    tick();
    fixture.detectChanges();
    expect(component.people.id).toBe(expectedPeople.id);
  }));

  it('should change people to the new one', fakeAsync(() => {
    service.changePeople(PEOPLE[0]);
    tick();
    fixture.detectChanges(); // onInit()
    expect(spy.calls.any()).toBe(true, 'people called');
  }));


  it('should display close button', () => {
    fixture.detectChanges(); // onInit()
    const button = el.querySelector('.mat-button');
    expect(button.textContent).toBe('Close');
  });
});

class Page {
  /** Hero line elements */
  peopleRows: HTMLLIElement[];

  /** Highlighted element */
  highlightDe: DebugElement;

  /** Spy on router navigate method */
  navSpy: jasmine.Spy;

  constructor() { };
}

