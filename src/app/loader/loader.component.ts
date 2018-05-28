import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LoaderService } from './shared/loader.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
    constructor(public loaderService: LoaderService) { }

    ngOnInit() {
    }
}