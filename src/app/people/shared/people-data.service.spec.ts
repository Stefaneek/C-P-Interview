import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';

import { PeopleDataService } from './people-data.service';
import { LoaderService } from '../../loader/shared/loader.service';
import { asyncError, asyncData } from '../../testing/async-observable-helpers';
import { PEOPLE } from '../../testing/people-data.service.mock';

let fixture: ComponentFixture<PeopleDataService>;
let snackBar;
let httpClientSpy: { get: jasmine.Spy };
let httpClient: HttpClient;
let httpTestingController: HttpTestingController;

describe('PeopleDataService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PeopleDataService,
        { provide: LoaderService, useClass: LoaderService },
        { provide: MatSnackBar, useValue: snackBar }
      ],
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it(`should create`, async(inject([HttpClient, PeopleDataService, MatSnackBar, LoaderService],
    (httpClient: HttpClient, peopleDataService: PeopleDataService, snackBar: MatSnackBar, loaderService: LoaderService) => {
      expect(peopleDataService).toBeTruthy();
    })));

  it('can instantiate service with "new"', async(inject([HttpClient, PeopleDataService, MatSnackBar, LoaderService],
    (httpClient: HttpClient, peopleDataService: PeopleDataService, snackBar: MatSnackBar, loaderService: LoaderService) => {
      expect(httpClient).not.toBeNull('http should be provided');
      const service = new PeopleDataService(httpClient, loaderService, snackBar);
      expect(service instanceof PeopleDataService).toBe(true, 'new service should be ok');
    })));

  it('should return an error when the server returns a 404', async(inject([HttpClient, PeopleDataService, MatSnackBar, LoaderService],
    (httpClient: HttpClient, peopleDataService: PeopleDataService, snackBar: MatSnackBar, loaderService: LoaderService) => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404, statusText: 'Not Found'
      });

      httpClient.get.bind(asyncError(errorResponse));
      peopleDataService.getPeople().subscribe(
        people => fail('expected an error, not people'),
        error => {
          expect(error.message).toContain('test 404 error')
        }
      );
    })));

  describe('when get people', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let service: PeopleDataService;

    beforeEach(inject([HttpClient, PeopleDataService, MatSnackBar, LoaderService],
      (httpClient: HttpClient, peopleDataService: PeopleDataService, snackBar: MatSnackBar, loaderService: LoaderService) => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new PeopleDataService(<any>httpClientSpy, loaderService, snackBar);
      }));

    it('should return expected people array (HttpClient called once)', () => {
      httpClientSpy.get.and.returnValue(asyncData(PEOPLE));

      service.getPeople().subscribe(
        people => expect(people).toEqual(PEOPLE, 'expected people'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return expected single people (HttpClient called once)', () => {
      httpClientSpy.get.and.returnValue(asyncData(PEOPLE[0]));

      service.getPeopleById(1).subscribe(
        people => expect(people.id).toEqual(PEOPLE[0].id, 'expected people'),
        fail
      );
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
  });
})