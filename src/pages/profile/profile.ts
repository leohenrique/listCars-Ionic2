import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _userService: UserService) {}

  
  get userLoggedIn(){
    return this._userService.getUserLoggedIn();
  }
  

}
