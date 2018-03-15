import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  data: any = {};
  loginStatus: String;
  constructor() { }

  ngOnInit() {
    this.loginStatus = localStorage.getItem('currentUser') ? 'LOG OUT' : 'LOG IN';
    this.getCurrentPosition() ;
  }
  getCurrentPosition()  {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.data.lat = position.coords.latitude;
        this.data.lng = position.coords.longitude;
      });
    }
  }
}
