import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { PEOPLE } from '../../testing/people-data.service.mock';
import { PersonProfileComponent } from '../person-profile/person-profile.component';
import { PeopleDataService } from '../shared/people-data.service';
import { RequestCacheService } from '../../http-interceptors/request-cache.service';
import { People } from '../shared/people.mode';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit {
  people = PEOPLE;
  sortOptions = [
    { value: 'asc', viewValue: 'Ascending' },
    { value: 'dsc', viewValue: 'Descending ' },
    { value: 'default', viewValue: 'Default order' }
  ];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public peopleDataService: PeopleDataService,
    private requestCacheService: RequestCacheService,
    public cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getPeople();
  }

  routeToPerson(person: People) {
    this.router.navigate(['/people/' + person.id]);
  }

  openDialog(peopleId: number) {
    const dialogRef = this.dialog.open(PersonProfileComponent, {
      panelClass: 'custom-dialog-container',
      data: peopleId,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['']);
    });
  }

  sort(event: string) {
    switch (event) {
      case "asc": {
        this.people = this.people.sort(this.sortAsc);
        break;
      }
      case "dsc": {
        this.people = this.people.sort(this.sortDsc);
        break;
      }
      case "default": {
        this.people = this.people.sort();
        break;
      }
    }

    this.peopleDataService.changePeopleArray(this.people);
  }

  sortAsc(peopleA: People, peopleB: People) {
    if (peopleA.last_name < peopleB.last_name)
      return -1;
    if (peopleA.last_name > peopleB.last_name)
      return 1;
    return 0;
  }

  sortDsc(peopleA: People, peopleB: People) {
    if (peopleA.last_name > peopleB.last_name)
      return -1;
    if (peopleA.last_name < peopleB.last_name)
      return 1;
    return 0;
  }

  reloadData() {
    this.requestCacheService.clear();
    this.getPeople();
  }

  getPeople() {
    this.activatedRoute.params.subscribe((params) => {
      const peopleId = params ? params['id'] : null;
      if (peopleId) {
        this.openDialog(peopleId);
      }
      else {
        this.peopleDataService.getPeople().subscribe((people: People[]) => {
          this.people = people;
          if (!people) {
            this.peopleDataService.changePeopleArray(PEOPLE);

          }
          else {
            this.peopleDataService.changePeopleArray(people);
          }
        })
      }
    });
  }
}
