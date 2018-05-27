import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LoaderService } from './service/loader.service';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routes';
import { MainComponent } from './main/main.component';
import { PersonProfileComponent } from './person-profile/person-profile.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        LoaderComponent,
        MainComponent,
        PersonProfileComponent
      ],
      providers: [
        {provide: LoaderService}
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
