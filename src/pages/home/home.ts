import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ListCarsPage } from '../list-cars/list-cars';
import { Car } from '../../domain/car/car';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public cars: Car[]; 
  
  constructor(public navCtrl: NavController, 
              private _http: Http,
              private _loadingCtrl: LoadingController,
              private _alertCtrl: AlertController) {
    
  }

  ngOnInit(){
    let loader = this._loadingCtrl.create(
      {content: 'Searching cars. Wait...'}
    );

    loader.present();
    this._http
      .get('https://aluracar.herokuapp.com/')
      .map(res => res.json())
      .toPromise()
      .then(remoteCars => {
        this.cars = remoteCars;
        loader.dismiss();        
      })
      .catch(err => {
        console.log(err);
        loader.dismiss(); 
        this._alertCtrl
          .create({
            title: 'Connection error',
            buttons: [{ text: 'Ok!'}],
            subTitle: 'Não foi possível obter a lista de carros. Tente mais tarde'
          }).present();
      });

  }

  select(car){
    
    this.navCtrl.push(ListCarsPage, { selectedCar: car});
  }
}
