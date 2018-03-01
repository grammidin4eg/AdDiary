import { Injectable } from '@angular/core';
import {Ad, User } from './fl';

@Injectable()
export class AdlistService {
   AdList: Ad[];
  constructor() { }
  getDemoData(): Ad[] {
     this.AdList = [];
     this.AdList.push(new Ad('130;90;95', '','', '140;90;107', '', ''));
     this.AdList.push(new Ad('120;80;90', '','', '127;87;106', '', ''));
     return this.AdList;
  }

}
