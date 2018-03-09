import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService } from '../../_services/index';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private alertService: AlertService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }
  // Init variable
  user: any = {}; // model to login
  registation: any = {}; // model to registation
  returnUrl: string; // url to navigate after login
  loading: boolean;
  ngOnInit() {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authService.login(this.user.username, this.user.password)
        .subscribe(
            data => {
              // login successful
              console.log(JSON.parse(localStorage.getItem('currentUser')).role);
              if (JSON.parse(localStorage.getItem('currentUser')).role > 1) {
                this.router.navigate(['/admin']); // navigate to admin page
              } else {
                this.router.navigate([this.returnUrl]);
              }
            },
            error => {
              // login fail , call alert service
                this.alertService.error(error);
            });
  }
  register() {
    this.loading = true;
    this.authService.register(this.registation)
        .subscribe(
            data => {
                // set success message and pass true paramater to persist the message after redirecting to the login page
                this.alertService.success('Registration successful', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

}
