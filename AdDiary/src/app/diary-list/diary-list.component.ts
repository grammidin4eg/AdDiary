import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdlistService } from '../adlist.service';
import {Ad, User } from '../fl';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.css']
})
export class DiaryListComponent implements OnInit {
  id: number;
  curMonth: number;
  data: Ad[];
  visData: Ad[];
  constructor(private route: ActivatedRoute, private adListService: AdlistService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('diary-init', id);    
    this.id = id;
    //месяц, по умолчанию текущий
    this.curMonth = (new Date()).getMonth();
    //Получить данные
    if (id == 1 ) {
      //DEMO режим
      this.data = this.adListService.getDemoData();
    }
    //Заполнить оставшийся месяц
    //отобразить данные
    this.visData = this.adListService.fillMonthData(this.curMonth);
    console.log('visData', this.visData);
  }

}
