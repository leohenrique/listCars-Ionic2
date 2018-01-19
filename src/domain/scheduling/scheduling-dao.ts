import { Injectable } from "@angular/core";
import { Scheduling } from "./scheduling";
import { Storage } from "@ionic/storage";

@Injectable()
export class SchedulingDao {

    constructor(private _storage: Storage){}

    private _getKey(scheduling: Scheduling){

        return scheduling.email+scheduling.date.substr(0,10);
    }

    public save(scheduling: Scheduling){
        this._storage.set(this._getKey(scheduling), scheduling);
    }
    
    public isSchedulingDuplicated(scheduling: Scheduling){

        let key = this._getKey(scheduling);
        return this._storage
            .get(key)
            .then(data => {
                return data ? true : false;
            });
    }
}