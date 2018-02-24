import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { appConfig } from '../app.config';
import { AlertService, MotelService } from '../_services/index';

const URL = appConfig.apiUrl + "/uploadImg";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  // set up file uploader
  public motel: any = {};
  options: FormGroup;
  constructor(public dialog: MatDialog,fb: FormBuilder, 
    public motelService: MotelService, public alertService: AlertService,
    public router: Router) {this.options = fb.group({
    hideRequired: false,
    floatLabel: 'auto',
  }); }


  ngOnInit() {
  }
  onSubmit(){
    // get location from session
    this.motel.lat = localStorage.getItem("lat");
    this.motel.lng = localStorage.getItem("lng");
    this.motel.customer = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.motel.status = false;
    // remove session location
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");
    this.motelService.create(this.motel).then(data =>
      {
        const id = JSON.parse(data._body);
        this.router.navigate(['/item', id]);
        this.alertService.success(data.toString());
      },
      (err) => {this.alertService.error(err)});
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {motel: this.motel}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  passData(model: any) {
    // console.log(model);
    model.forEach(element => {
      if (element.types[0] === 'administrative_area_level_1') {
        this.motel.city = element.long_name;
      }
      if(element.types[0] == "administrative_area_level_2")
      {
        this.motel.district = element.long_name;
      }
      if(element.types[0] == "sublocality_level_1")
      {
        this.motel.ward = element.long_name;
      }
      if(element.types[0] == "route")
      {
        this.motel.street = element.long_name;
      }
      if(element.types[0] == "street_number")
      {
        this.motel.add = element.long_name;
      }
    });

    console.log(this.motel);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./dialog-overview-example-dialog.css']
})
export class DialogOverviewExampleDialog {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
   
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    alertService: AlertService) {
      this.uploader.onCompleteItem = (item: FileItem, response: string, status: number) => {
        console.log(status);
        if(status === 200)
        {
          this.data.motel.img = response;
          alertService.success(response);
        }
        else{
          alertService.error("Status: " + status + "||" + response);
        }
      }
  
      this.uploader.onErrorItem = (item: FileItem, response: string, status: number) => {
        alertService.error(response);
        console.log(response);
      }
      
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}