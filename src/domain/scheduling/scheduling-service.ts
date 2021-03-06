import { Http } from "@angular/http/";
import { Scheduling } from "./scheduling";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { SchedulingDao } from "./scheduling-dao";

@Injectable()
export class SchedulingService {

    constructor(private _http: Http, private _schedulingDao: SchedulingDao){

    }

    private _createUri(scheduling:Scheduling){
        return `https://aluracar.herokuapp.com/salvarpedido?carro=${scheduling.car.nome}&nome=${scheduling.name}&preco=${scheduling.value}&endereco=${scheduling.address}&email=${scheduling.email}&dataAgendamento=${scheduling.date}`;
    }
    
    schedule(scheduling: Scheduling){

        let api = this._createUri(scheduling);
        
        return this._schedulingDao.isSchedulingDuplicated(scheduling).
            then(exists => {
                if (exists) throw new Error("Scheduling already exists.");
                
                return this._http
                        .get(api)
                        .toPromise()
                        .then(() => scheduling.confirmed = true, err => console.log(err) )
                        .then(() => this._schedulingDao.save(scheduling))                    
                        .then(() => scheduling.confirmed )

            } );
    }

    resendSchedule(scheduling: Scheduling){
        let api = this._createUri(scheduling);
        
        return this._http
                    .get(api)
                    .toPromise()
                    .then(() => scheduling.confirmed = true, err => console.log(err) )
                    .then(() => this._schedulingDao.save(scheduling))                    
                    .then(() => scheduling.confirmed )
        
    }

}