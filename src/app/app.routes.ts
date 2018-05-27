import {Routes} from '@angular/router';
import { PeopleListComponent } from './people/people-list/people-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PeopleListComponent
  },
  {
    path: 'people/:id',
    component: PeopleListComponent,
  }
]
