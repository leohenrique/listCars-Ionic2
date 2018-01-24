import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListCarsPage } from '../pages/list-cars/list-cars';
import { RegisterPage } from '../pages/register/register';
import { SchedulingService } from '../domain/scheduling/scheduling-service';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SchedulingDao } from '../domain/scheduling/scheduling-dao';
import { SchedulingPage } from '../pages/scheduling/scheduling';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../domain/user/user-service';
import { ProfilePage } from '../pages/profile/profile';

export function provideStorage(){
  return new Storage();
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListCarsPage,
    RegisterPage,
    SchedulingPage,
    LoginPage,
    ProfilePage
  ],
  imports: [
    IonicStorageModule.forRoot({
      name: 'aluracar',
      storeName: 'schedules',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListCarsPage,
    RegisterPage,
    SchedulingPage,
    LoginPage,
    ProfilePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SchedulingService,
    {provide: Storage, useFactory: provideStorage},
    SchedulingDao,
    UserService
  ]
})

export class AppModule {}
