import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from './user';

@Injectable()
export class UserService {

    private _userLoggedIn: User;

    constructor(private _http: Http){}

    public applyLogin(email:string, password: string){

        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${password}`;
        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(data => {
                let user = new User(data.nome, data.dataNascimento, data.email, data.telefone)
                this._userLoggedIn = user;
                return user;
            });

    }

    public getUserLoggedIn(){
        return this._userLoggedIn;
    }
}