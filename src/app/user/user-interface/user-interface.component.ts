import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService } from '../../_services/index';
@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.css']
})
export class UserInterfaceComponent implements OnInit {

  constructor(private authService: AuthenticationService, private alertService: AlertService) { }
  changePasswordFlag = false; // flag show card to change password
  color = 'primary';
  mode = 'determinate';
  value = 80;
  step = 0;
  user: any = {};
  password: any = {}; // model to change password
  ngOnInit() {
    const id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getUser(id);
    console.log(this.user);
  }
  getUser(id) {
    this.authService.findById(id)
      .subscribe( res => {
        this.user = res;
      }, err => {
        this.alertService.error(err);
      });
  }
  update() {
    this.authService.update(JSON.parse(localStorage.getItem('currentUser'))._id, this.user)
      .subscribe(res => {
        this.alertService.success('Update success');
      }, err => {
        this.alertService.error(err);
      });
  }
  changePassword() {
    if (this.password.newPassword !== this.password.confirmPassword) {
      this.alertService.error('Password confirm incorect');
    } else {
      if (this.password.newPassword.lenght < 8 || this.password.confirmPassword.length < 8) {
        this.alertService.error('Password must have at least 8 character');
      } else {
        this.authService.changePassword(JSON.parse(localStorage.getItem('currentUser'))._id, this.password)
          .subscribe(res => {
            this.alertService.success('change success');
          }, err => {
            this.alertService.error(err);
          });
      }
    }
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
