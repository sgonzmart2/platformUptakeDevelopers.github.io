import { Component, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../models/user';
import *  as constants from '../utilities/constants';
import { PlatformsDOAService } from '../api/DOA/platforms-doa.service';
import { UserDOAService } from '../api/DOA/user-doa.service';
import { KpiDoaService } from '../api/DOA/kpi-doa.service';
import { ActivatedRoute } from '@angular/router';
import { EncryptedStorageService } from '../utilities/encryptedStorageService'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loaded = false;
  error = '';
  user_id;

  constructor(private clientService: UserDOAService,
    private router: Router,
    private storageSecure: EncryptedStorageService,
    private activatedRoute: ActivatedRoute,
    private kpisServices: KpiDoaService,
    private platformService: PlatformsDOAService) {

    this.storageSecure.removeUser(constants.user_id);
    this.storageSecure.removeUser(constants.user_info);
    this.activatedRoute.queryParams.subscribe(params => {
      this.user_id = params['uid'];
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.checkCredentialsAndTypeUser();
  }

  checkCredentialsAndTypeUser() {
    if (this.user_id != null) {
      if (this.user_id == '') {
        this.user_id = "null"
      }
    }
    this.clientService.login(this.user_id).subscribe(
      response => {

        let currentUser: user = response;
        if (this.user_id != undefined) {
          this.storageSecure.secureStorage(constants.user_id, this.user_id)
        }
        this.storageSecure.secureStorage(constants.user_info, JSON.stringify(currentUser))
        if (currentUser.role_id != null) {
          this.clientService.storeData(currentUser.role_title);
          this.router.navigate(['home']);
          this.loaded = true;
          this.initConstants();
          this.clientService.emitLogin();
        }
        else {
          console.log("error currentUser")
          //this.router.navigate(['']);
        }
        // 
        /*let message;
        if (response.status == 401) {
          this.translate.get('loginUnauthorized').subscribe(value => {
            message = value;
          });
 
          console.log("ERROR :", response.status)
          console.log("mensage :", message)
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else {
          this.translate.get('formatError').subscribe(value => {
            message = value;
          });
 
          console.log("ERROR :", response.status)
          console.log("mensage :", message)
          //this.notifSevice.error(message);
          this.loaded = false;
        }
      },
      error => {
        let message = "";
        if (error.status == 404) {
          this.translate.get('notFoundError').subscribe(value => {
            message = value;
          });
 
          console.log("ERROR :", error.status)
          console.log("mensage :", message)
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else if (error.status == 502) {
          this.translate.get('error502').subscribe(value => {
            message = value;
          });
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else if (error.status == 500) {
          this.translate.get('error500').subscribe(value => {
            message = value;
          });
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else if (error.status == 501) {
          this.translate.get('error501').subscribe(value => {
            message = value;
          });
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else if (error.status == 503) {
          this.translate.get('error503').subscribe(value => {
            message = value;
          });
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else if (error.status == 504) {
          this.translate.get('error504').subscribe(value => {
            message = value;
          });
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else if (error.status == 505) {
          this.translate.get('error505').subscribe(value => {
            message = value;
          });
          this.notifSevice.error(message);
          this.loaded = false;
        }
        else {
          this.notifSevice.error(error.statusText);
          this.loaded = false;
          this.error = error.error.statusText;
        }*/
      }
    )
  }

  initConstants() {
    //this.getPlatforms();
    this.kpisServices.updateKPIsCategories();
    this.kpisServices.updateKPIsClusters();
    this.kpisServices.updateKPIsDimension();
    this.platformService.updatePlatformsInfo();
  }
}