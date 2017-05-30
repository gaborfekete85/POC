import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {User} from "../_models/user";

@Injectable()
export class AuthenticationService {
    baseUrl : String;
    constructor(private http: Http) {
        this.baseUrl = "http://localhost:8001";
    }

    login(username: string, password: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let requestOptions = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + '/user/auth', JSON.stringify({ username: username, password: password }), requestOptions)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let authenticationResponse = response.json();
                if (authenticationResponse.id_token && authenticationResponse.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(authenticationResponse.user));
                    localStorage.setItem('id_token', authenticationResponse.id_token);
                    localStorage.setItem('access_token', authenticationResponse.access_token);
                }
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    getUsers() : Observable<User[]> {
        return this.http.get(this.baseUrl + '/api/user', this.jwt()).map((response: Response) => response.json());
    }

    deleteUser(id : number) : Observable<User[]> {
        return this.http.delete(this.baseUrl + '/api/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let accessToken = localStorage.getItem('access_token');
        let headers;
        if (!accessToken) {
            headers = new Headers({ 'Content-Type': 'application/json'});
        } else {
            headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken });
        }
        return new RequestOptions({ headers: headers });
    }
}