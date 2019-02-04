import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SimboResult, CallParams, BLURL } from './simbo';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserRegService {

  constructor(private http: HttpClient) { }

  userData;

  Registration(email, name, password, age, weight): Observable<SimboResult> {
    // id, name, hkey, email
    const params = new CallParams('User', 'Registration', 'None', {
      'email': email,
      'password': password,
      'name': name,
      'age': age,
      'weight': weight
    });
    return this.http.post<SimboResult>(BLURL, params);
  }

  Login(email, password): Observable<SimboResult> {
   const params = new CallParams('User', 'LoginPassword', 'None', {
      'login': email,
      'password': password,
    });
    return this.http.post<SimboResult>(BLURL, params);
  }

  setUserData(data) {
     this.userData = data;
     /*
     age:"33"
     email:"mail_ego@list.ru"
     id:"14"
     name:"Юрий"
     weight:"140"
     */
  }

  getUserId() {
     if (!this.userData) {
        return null;
     }
     return this.userData.id;
  }

}
