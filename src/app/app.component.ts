import { Component, ViewChild} from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { SchedulingPage } from '../pages/scheduling/scheduling';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  
  public appPages = [
    { title: 'Scheduling', component: SchedulingPage },
    { title: 'Profile', component: ProfilePage }
  ];

  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(pPage){
    this.nav.push(pPage.component);
  }
}
