import { Component, OnInit } from '@angular/core';

import { MotelService } from '../../../_services/index';
@Component({
  selector: 'app-admin-table-motel',
  templateUrl: './admin-table-motel.component.html',
  styleUrls: ['./admin-table-motel.component.css']
})
export class AdminTableMotelComponent implements OnInit {
  viewAccepted = false;
  constructor(private motelService: MotelService) { }

  ngOnInit() {
    this.motelService.findByStatus(0)
      .subscribe(res => {
        console.log(res);
      }, err => console.log(err));
  }
  handleAccepted() {
    this.viewAccepted = !this.viewAccepted;
  }
}
