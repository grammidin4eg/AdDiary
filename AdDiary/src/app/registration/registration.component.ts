import { Component, OnInit } from '@angular/core';
import { UserRegService } from '../user-reg.service';

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
   constructor(private userserv: UserRegService) { }

   onSubmit() {
      console.log('submit', this.email, this.name, this.age, this.weight);
      const res = this.userserv.Registration(this.email, this.name, this.password, this.age, this.weight);
      console.log('res', res);
   }

   ngOnInit() {
   }

}
