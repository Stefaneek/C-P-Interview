import {Routes} from '@angular/router';
import { PeopleList } from './people/people-list/people-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PeopleList
  },
  {
    path: 'people/:id',
    component: PeopleList,
  }
]
