import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Accessory } from '../../domain/car/accessory';
import { Car } from '../../domain/car/car';
import { RegisterPage } from '../register/register';

@Component({
    templateUrl: 'list-cars.html'
})
export class ListCarsPage {

    public car: Car;
    public accessories: Accessory[];
    private _totalPrice: number;

    constructor (public navParams: NavParams, public navCtrl: NavController){

        this.car = navParams.get('selectedCar');
        this._totalPrice = this.car.preco;
        this.accessories = [
            new Accessory('Freio ABS', 800),
            { name: 'Ar-condicionado', price: 1000 },
            { name: 'MP3 Player', price: 500 }
        ];

    }

    get totalPrice(){

        return this._totalPrice;
    }

    updateTotal(toogleChecked: boolean, acessory: Accessory){
        toogleChecked ?
            this._totalPrice += acessory.price:
            this._totalPrice -= acessory.price; 

    }

    forwardScheduling(){

        this.navCtrl.push(RegisterPage, 
            {car: this.car, 
             totalPrice: this._totalPrice}
        );

    }
}