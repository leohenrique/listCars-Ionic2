import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SchedulingDao } from '../../domain/scheduling/scheduling-dao';
import { Scheduling } from '../../domain/scheduling/scheduling';
import { SchedulingService } from '../../domain/scheduling/scheduling-service';


@Component({
  selector: 'page-scheduling',
  templateUrl: 'scheduling.html'
})
export class SchedulingPage {

  public schedules: Scheduling[];

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private _dao: SchedulingDao,
            private _service: SchedulingService,
            private _alertCtrl: AlertController){

    this._dao
      .selectAll()
      .then(schedules => this.schedules = schedules);

  }
  
  resend(scheduling: Scheduling){
    console.log('resend');
    this._service
      .resendSchedule(scheduling)
      .then(confirmed => {
          
        confirmed 
        ? this._alertCtrl.create({
          title: 'Scheduling',
          subTitle: 'Scheduling sent successfully',
          buttons: [{text:'OK'}]
        }).present ()
        : this._alertCtrl.create({
          title: 'Scheduling',
          subTitle: 'Scheduling not sent',
          buttons: [{text:'OK'}]
        }).present ()
      });
  }
 
}
