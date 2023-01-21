import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Stable, StableService} from '../../services/stable/stable.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  /**
   * Hold all available places
   */
  stables: Stable[] = [];

  /**
   * Reactive from group
   */
  form: FormGroup;


  constructor(
    private modalCtrl: ModalController,
    private stableService: StableService,
    private fb: FormBuilder
  ) {
    // set places from service getter
    //this.stables = this.stableService.stables;
    this.stableService.stables$.subscribe(stables=>{
      this.stables = stables;
      // create form hardcoded
      this.form = this.fb.group({
        ch1: [this.stables[0].homepage, []],
        ch2: [this.stables[1].homepage, []],
        ch3: [this.stables[2].homepage, []],
        ch4: [this.stables[3].homepage, []],
        ch5: [this.stables[4].homepage, []],
        ch6: [this.stables[5].homepage, []],
        ch7: [this.stables[6].homepage, []],
        ch8: [this.stables[7].homepage, []],
        ch9: [this.stables[8].homepage, []],
        ch10: [this.stables[9].homepage, []]
      });
      // on form control (value) change
      this.form.valueChanges.subscribe(data => {
        // set every hardcoded place to save active state
        this.stableService.setHome(0, data.ch1);
        this.stableService.setHome(1, data.ch2);
        this.stableService.setHome(2, data.ch3);
        this.stableService.setHome(3, data.ch4);
        this.stableService.setHome(4, data.ch5);
        this.stableService.setHome(5, data.ch6);
        this.stableService.setHome(6, data.ch7);
        this.stableService.setHome(7, data.ch8);
        this.stableService.setHome(8, data.ch9);
        this.stableService.setHome(9, data.ch10);
      });
    });
  }

  ngOnInit() {
  }

  /**
   * Click event dismiss
   */
  async dismiss() {
    // dismiss modal
    await this.modalCtrl.dismiss();
  }
}
