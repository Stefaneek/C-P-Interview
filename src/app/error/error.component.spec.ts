import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ],
      providers: [{ provide: MAT_SNACK_BAR_DATA, useValue: "Error displayed" }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('span');
  }));
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error', () => {
    let errorText = el.textContent;
    expect(errorText).toBe("Error displayed")
  });
});
