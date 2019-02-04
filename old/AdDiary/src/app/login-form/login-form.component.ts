import { Component, OnInit } from '@angular/core';
import { UserRegService } from '../user-reg.service';
import { SimboResult } from '../simbo';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

   email: String;
   password: String;
   error: String = '';
   constructor(private userserv: UserRegService, private location: Location) { }

   onSubmit() {
   console.log('login', this.email, this.password);
   this.userserv.Login(this.email, this.password).subscribe(value => {
       // value - результат
       console.log('value', value);
       const res = new SimboResult(value);
       if ( res.isOK() ) {
         console.log('Data', res.getData());
         console.log('List', res.getList());
         this.userserv.setUserData(res.getList());
         this.location.go(('diary/' + this.userserv.getUserId() ));
       } else {
         if ( res.errorEqu('UserLoginKey') ) {
            this.error = 'Неверный логин/пароль. Проверьте введенные данные и попробуйте еще раз.';
         } else {
            this.error = res.getError();
         }
       }
     },
     error => {
       // error - объект ошибки
       console.log('error', error);
       this.error = 'Произошла ошибка при попытке зайти в систему. Проверьте введенные данные и попробуйте еще раз.';
     });
  }

  ngOnInit() {
  }


}
