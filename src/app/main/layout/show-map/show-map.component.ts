import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService, MotelService } from '../../../_services/index';
import 'rxjs/add/operator/filter';
import { } from 'googlemaps';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css']
})
export class ShowMapComponent implements OnInit {
  public list: any = [];
  public latitude: number;
  public longitude: number;
  public data: any = {};
  public listLocation: any = {};
  public zoom: number;
  value = 'Choose distance';
  constructor(private router: Router
    , private route: ActivatedRoute, private alertService: AlertService, private motelService: MotelService) { }

  ngOnInit(): void {
    // set google maps defaults
    this.route.data
    .subscribe((data) => {this.list = data; console.log(this.list); } );
    this.zoom = 14;
    this.latitude = 10.8504796;
    this.longitude = 106.77129390000005;

    this.list.list.forEach(element => {
      element.lat = Number.parseFloat(element.lat);
      element.lng = Number.parseFloat(element.lng);
    });
    this.setCurrentPosition() ;
    }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
         // set latitude, longitude and zoom
         this.data.lat = this.latitude = position.coords.latitude;
         this.data.lng =  this.longitude = position.coords.longitude;
         this.zoom = 13;
         this.getListNearBy();
      }, (err) => {
        this.alertService.error('YOUR BROWSER DOES NOT SUPPORT GPS');
      });
    }
  }

  getListNearBy() {
    this.motelService.getListNearBy(this.data).subscribe((res) => {
      this.listLocation = res;
    }, (err) => {
      this.alertService.error('ERR');
    });
  }

  searchWithDistance() {
    this.router.navigate(['/show-map'], {queryParams: {lat: this.latitude, lng: this.longitude, dis: this.value}});
    window.location.reload();
  }
}
