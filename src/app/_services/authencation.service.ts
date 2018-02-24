import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }
    register(user)
    {
        return this.http.post('/users/register', user);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("mod");
        localStorage.removeItem('currentUser');
    }

    findMod()
    {
        var data : any;
        return this.http.post('/users/find-mod',data)
        .map((response: Response) => {
           
            let user = response.json();
           
            return user;
        }) 
       ;
    }
    _delete(id)
    {
        return this.http.delete('/users/' + id);
    }
}