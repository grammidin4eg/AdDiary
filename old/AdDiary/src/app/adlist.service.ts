import { Injectable } from '@angular/core';
import { Ad, User } from './fl';

@Injectable()
export class AdlistService {
  AdList: Ad[];
  constructor() { }
  getDemoData(): Ad[] {
    this.AdList = [];
    this.AdList.push(new Ad(9, '130;90;95', '', '', '140;90;107', '', ''));
    this.AdList.push(new Ad(10, '120;80;90', '', '', '127;87;106', '', ''));
    return this.AdList;
  }

  getData(month: number): Ad[] {
    return this.getDemoData();
  }

  addCurDayToAd(inAd: Ad, curDate: Date, month: number): Ad {
    if (curDate.getMonth() == month) {
      inAd.setCurDate(inAd.day == curDate.getDate());
    }
    return inAd;
  }

  fillMonthData(month: number): Ad[] {
    let
      data: Ad[] = [],
      finded: boolean,
      curDate = new Date(),
      self = this,
      lastDay = (new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0)).getDate();

    for (let day = 1; day <= lastDay; day++) {
      finded = false;
      this.AdList.forEach(function (curAd) {
        if (curAd.day == day) {
          data.push(self.addCurDayToAd(curAd, curDate, month));
          finded = true;
        }
      });
      if (!finded) {
        data.push(self.addCurDayToAd(new Ad(day, '', '', '', '', '', ''), curDate, month));
      }
    }
    //todo день недели, текущий день выделить, определить последний день месяца
    return data;
  }

}
