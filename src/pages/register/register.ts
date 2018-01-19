import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Car } from '../../domain/car/car';
import { HomePage } from '../home/home';
import { Scheduling } from '../../domain/scheduling/scheduling';
import { SchedulingService } from '../../domain/scheduling/scheduling-service';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'register.html'
})
export class RegisterPage {

  public car: Car;
  public totalPrice: number;

  public scheduling: Scheduling;

  private _alert: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _schedulingService: SchedulingService,
    private _alertCtrl: AlertController) {
    
    this.car = this.navParams.get('car');
    this.totalPrice = this.navParams.get('totalPrice');
    this.scheduling = new Scheduling(this.car, this.totalPrice);

    this._alert = this._alertCtrl.create({
      title: 'Warning',
      buttons: [{ text: 'OK', handler: () => this.navCtrl.setRoot(HomePage)}]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  schedule(){
    
    if (!this.scheduling.name || !this.scheduling.address || !this.scheduling.email){

      this._alertCtrl.create({
        title: 'Fields Required',
        subTitle: 'You must complete all the fields in the form!',
        buttons: [{text: 'OK'}]
      }).present();
      return;
    }
    this._schedulingService
      .schedule(this.scheduling)
      .then(confirmado => {
        confirmado ? 
          this._alert.setSubTitle("Schedule registered successfully!"):
          this._alert.setSubTitle("Error to schedule! Try again later.");
        this._alert.present();
      })
      .catch(err => {
        console.log(err);
        this._alert.setSubTitle(err.message)
        this._alert.present();
      })

  }
}
