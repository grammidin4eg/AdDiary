import { Component, OnInit, Input } from '@angular/core';
import {AdValue } from '../fl';

@Component({
  selector: 'app-ad-input',
  templateUrl: './ad-input.component.html',
  styleUrls: ['./ad-input.component.css']
})
export class AdInputComponent implements OnInit {
  @Input() data: AdValue;
  public inputMask = [/[0-9]/, /[0-9]/, /[0-9]/]
  constructor() { }

  ngOnInit() {
  }

  valueClick() {
    console.log('click', this.data);
    /*this.visData.forEach(curData => {      
      curData.value1.setEdit(false);
    });*/
    this.data.setEdit(true);
  }

  updateValue() {
    console.log('updateValue', this.data, this.data.up);    
    this.data.setEdit(false);
  }

}
