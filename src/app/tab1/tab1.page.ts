import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Observable } from 'rxjs';
import {isPlatform, ModalController} from '@ionic/angular';
import { SettingsPage } from '../pages/settings/settings.page';
import { StableService } from '../services/stable/stable.service';
import { TeamResponse } from '../models/team.model';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  team$: Observable<TeamResponse>[] = [];

  constructor(
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private stableService: StableService
  ) {}

  ngOnInit() {
    this.initTeam();
    this.stableService.stables$.subscribe(() => {
      this.initTeam();
    });
  }

  async openModal() {
    const modal = await this.modalCtrl .create({
      component: SettingsPage,
    });
    await modal.present();
    await modal.onWillDismiss();
  }

  openDetail(team: TeamResponse) {
    this.stableService.detail = team;
  }

  private initTeam() {
    this.stableService.stables$.subscribe(stables => {
      this.team$ = [];
      stables.forEach(stable => {
        if (stable.homepage) {
          this.team$.push(this.apiService.getTeam(stable.id));
        }
      });
    });
  }
}
