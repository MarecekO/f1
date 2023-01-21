import {Component} from '@angular/core';
import {ApiService} from '../services/api/api.service';
import {Observable} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {SettingsPage} from '../pages/settings/settings.page';
import {StableService} from '../services/stable/stable.service';
import {TeamResponse} from '../models/team.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /**
   * Custom observable array
   */

  team$: Observable<TeamResponse>[] = [];

  constructor(
    // get custom Service from DI
    private apiService: ApiService,
    private modalCtrl: ModalController,
    private stableService: StableService
  ) {
    this.initTeam();
    console.log(this.team$);
  }


  /**
   * Click event
   */
  openSettings() {
    this.openModal();
  }

  /**
   * Open Ionic modal
   */
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });
    await modal.present();

    await modal.onWillDismiss();
    this.initTeam();
  }

  openDetail(team: TeamResponse) {
    // set data
    this.stableService.detail = team;
  }
  private initTeam() {
    this.stableService.stables$.subscribe(stables => {
      this.team$ = [];
      stables.forEach(stable => {
        if (stable.homepage) {
          console.log(this.apiService.getTeam(stable.id));
          this.team$.push(this.apiService.getTeam(stable.id));
        }
      });
    });
  }

}
