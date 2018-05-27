import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoaderService } from './shared/loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let service: LoaderService;
  let el: HTMLElement;
  let spinner: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule],
      declarations: [LoaderComponent],
      providers: [{ provide: LoaderService, useClass: LoaderService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    service = fixture.debugElement.injector.get(LoaderService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('it should display loader', fakeAsync(() => {
    service.show();
    fixture.detectChanges();
    spinner = fixture.nativeElement.querySelector('.mat-spinner');
    expect(spinner).toBeTruthy();
  }));

  it('it should hide loader', fakeAsync(() => {
    service.show();
    fixture.detectChanges();
    spinner = fixture.nativeElement.querySelector('.mat-spinner');
    expect(spinner).toBeTruthy();
    service.hide();
    fixture.detectChanges();
    spinner = fixture.nativeElement.querySelector('.mat-spinner');
    expect(spinner).toBeFalsy();
  }));
});
