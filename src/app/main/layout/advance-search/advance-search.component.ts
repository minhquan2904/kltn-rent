import { Component, OnInit } from '@angular/core';
import { appConfig } from '../../../app.config';


@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.css']
})
export class AdvanceSearchComponent implements OnInit {

  constructor() { }
  location = appConfig.vn;
  resultArray: any; // array to city list
  districtArray: any = []; // array to district
  query: any = {
    city: '',
    district: '',
    ward: '',
    street: ''
  };
  city: any = {};
  ngOnInit() {
    this.resultArray = Object.keys(this.location).map( res => {
      const city = this.location[res];
      return city;
    });
  }
  onCityChange() {
    this.query.city = this.resultArray[this.city.id].name;
    this.districtArray = Object.keys(this.resultArray[this.city.id].districts).map( res => {
      const name = this.resultArray[this.city.id].districts[res];
      return name;
    });
    this.query.address = this.query.city ;
  }

  onUpdateAddress(value) {
   this.query.address = value + ', ' + this.query.address;
  }
}
