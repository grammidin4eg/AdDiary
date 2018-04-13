import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdlistService } from '../adlist.service';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.css']
})
export class DiaryListComponent implements OnInit {
  id: number;
  constructor(private route: ActivatedRoute, private adListService: AdlistService) { }

  ngOnInit() {
   const id = +this.route.snapshot.paramMap.get('id');
   console.log('diary-init', id);
   this.id = id;
  }

}
