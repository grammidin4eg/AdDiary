import { Injectable } from '@angular/core';
import {Ad, User } from './fl';

@Injectable()
export class AdlistService {
   AdList: Ad[];
  constructor() { }
  getDemoData(): Ad[] {
     this.AdList = [];
     this.AdList.push(new Ad(130, 90, 95, 140, 90, 107,'', ''));
     this.AdList.push(new Ad(126, 90, 84, 140, 90, 107,'', ''));
     return this.AdList;
  }

}
