import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ErrorComponent } from './error/error.component';
import { CacheInterceptor } from './http-interceptors/cache-interceptor.service';
import { LoaderComponent } from './loader/loader.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PersonProfileComponent } from './people/person-profile/person-profile.component';
import { RequestCacheService } from './http-interceptors/request-cache.service';
import { LoaderService } from './loader/shared/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonProfileComponent,
    ErrorComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    RequestCacheService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  exports: [PersonProfileComponent, PeopleListComponent, ErrorComponent],
  entryComponents: [
    ErrorComponent,
    PersonProfileComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
