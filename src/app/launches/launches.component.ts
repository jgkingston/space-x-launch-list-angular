import { Params, Orders } from './../params';
import { Launch } from './../launch';
import { Component, OnInit, SimpleChanges, DoCheck } from '@angular/core';

import { LaunchService } from '../launch.service';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css']
})
export class LaunchesComponent implements DoCheck, OnInit {
  launches: Launch[];
  max: number | undefined;
  oldParamsOrder: Orders;
  oldParamsOffset: number;
  params: Params;

  constructor(private launchService: LaunchService) {
    this.max = undefined;
    this.params = {
      limit: 10,
      offset: 0,
      order: 'asc',
      sort: 'flight_number',
    };
  }

  ngOnInit() {
    this.getLaunches();
  }

  ngDoCheck() {
    if (this.params.order !== this.oldParamsOrder) {
      this.getLaunches();
      this.oldParamsOrder = this.params.order;
    }
    if (this.params.offset !== this.oldParamsOffset) {
      this.getLaunches();
      this.oldParamsOffset = this.params.offset;
    }
  }

  getLaunches(): void {
    this.launchService.getLaunches(this.params)
      .subscribe(launches => {
        this.launches = launches;
        if (launches.length < 10) {
          this.max = this.params.offset + launches.length;
        }
      });
  }

  onSelect(launch: Launch): void {
    if (!!launch.links.presskit) {
      window.open(launch.links.presskit);
    }
  }

  onSort(): void {
    this.params.order = this.params.order === 'asc' ? 'desc' : 'asc';
  }

  handleOffset(offset: number): void {
    this.params.offset = offset;
  }
}
