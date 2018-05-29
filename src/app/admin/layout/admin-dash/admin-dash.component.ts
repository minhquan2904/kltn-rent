import { Component, OnInit } from '@angular/core';
import { StatisticSerivce, AlertService } from '../../../_services/index';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {

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
