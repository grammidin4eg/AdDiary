import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SimboResult, CallParams, BLURL } from './simbo';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserRegService {

  constructor(private http: HttpClient) { }

  Registration(email, name, password, age, weight): Observable<SimboResult> {
    // id, name, hkey, email
    const params = new CallParams('User', 'Registration', 'None', {
      'email': email,
      'password': password,
      'fields': {
        'name': name,
        'email': email,
        'age': age,
        'weight': weight
      }
    });
    return this.http.post<SimboResult>(BLURL, params);
  }

}
