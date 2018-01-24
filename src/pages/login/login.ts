import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserService } from '../../domain/user/user-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public email: string = 'joao@alura.com.br';
  public password: string = 'alura123';


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _userService: UserService,
    private _alertCtrl: AlertController) {}

  
  applyLogin(){

    this._userService
      .applyLogin(this.email, this.password)
      .then(user => {
        console.log(user);
        this.navCtrl.setRoot(HomePage);
      })
      .catch(() => {
        this._alertCtrl.create({
          title: 'Login Error',
          subTitle: 'Invalid Email/Password',
          buttons: [{text: 'OK'}]
        }).present();

      })
    
  }

}
