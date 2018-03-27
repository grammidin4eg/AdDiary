import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

   email: String;
   name: String;
   age: Number;
   weight: Number;
   constructor() { }

   onSubmit() {
      console.log('submit', this.email, this.name, this.age, this.weight);
   }

   ngOnInit() {
   }

}
