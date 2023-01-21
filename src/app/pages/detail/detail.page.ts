import { Component, OnInit } from '@angular/core';
import {TeamResponse} from '../../models/team.model';
import {StableService} from '../../services/stable/stable.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  team: TeamResponse;

  constructor(
    private stableService: StableService
  ) {
  }

  ngOnInit() {
    this.team = this.stableService.detail;
  }

}
