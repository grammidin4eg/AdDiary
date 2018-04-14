import { Component, OnInit } from '@angular/core';
import { UserRegService } from '../user-reg.service';
import { SimboResult } from '../simbo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

   email: String;
   name: String;
   password: String;
   age: Number;
   weight: Number;
   error: String = '';
   constructor(private userserv: UserRegService, private location: Location) { }

   onSubmit() {
      // https://habrahabr.ru/post/336280/
      console.log('submit', this.email, this.name, this.age, this.weight);
      this.userserv.Registration(this.email, this.name, this.password, this.age, this.weight).subscribe(value => {
          // value - результат
          console.log('value', value);
          const res = new SimboResult(value);
          if ( res.isOK() ) {
            console.log('ID', res.getInsertId());
            this.location.go(('diary/' + res.getInsertId() ));
          } else {
            if ( res.errorEqu('UserRegistrationEmail') ) {
               this.error = 'Пользователь с такой почтой уже существует.';
            } else {
               this.error = res.getError();
            }
          }
        },
        error => {
          // error - объект ошибки
          console.log('error', error);
          this.error = 'Произошла ошибка при регистрации. Проверьте введенные данные и попробуйте еще раз.';
        });
   }

   ngOnInit() {
   }

}
