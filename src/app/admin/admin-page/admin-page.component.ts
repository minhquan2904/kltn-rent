import { Component, OnInit } from '@angular/core';
import { StatisticSerivce, AlertService } from '../../_services/index';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private statisticService: StatisticSerivce, private alertService: AlertService) { }
  static: any = {};
  ngOnInit() {
    this.statisticService.getInfo().subscribe((res) => {
      this.static = res.json();
      // console.log(this.static);
    }, (err) => {
      this.alertService.error(err);
    });
  }

}

