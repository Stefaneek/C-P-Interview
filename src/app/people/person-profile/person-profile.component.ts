import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PEOPLE } from '../../testing/people-data.service.mock';
import { PeopleDataService } from '../shared/people-data.service';
import { LoaderService } from '../../loader/shared/loader.service';
import { People } from '../shared/people.mode';

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonProfileComponent implements OnInit {
  people: People;
  constructor(
    private dialogRef: MatDialogRef<PersonProfileComponent>,
    @Inject(MAT_DIALOG_DATA) private peopleId: number,
    public peopleDataService: PeopleDataService,
    public loaderService: LoaderService) { }

  ngOnInit() {
    if (this.peopleId) {
      this.peopleDataService.getPeopleById(this.peopleId).subscribe(
        (people: People) => {
          this.people = people
          if (!people) {
            // for testing purpose
            this.peopleDataService.changePeople(PEOPLE[0])
          }
          else {
            this.peopleDataService.changePeople(people);
          }
        },
        error => { },
        () => { });
    }
  }
}
