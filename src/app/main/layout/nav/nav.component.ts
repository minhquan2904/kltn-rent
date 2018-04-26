import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  data: any = {};
  loginStatus: String;
  constructor(public translate: TranslateService) { }

  ngOnInit() {
    this.loginStatus = localStorage.getItem('currentUser') ? 'Log out' : 'Log in';
  }
}
