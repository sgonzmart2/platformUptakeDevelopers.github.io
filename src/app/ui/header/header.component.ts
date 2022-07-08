import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { UserDOAService } from 'src/app/api/DOA/user-doa.service';
import *  as constants from '../../utilities/constants';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

export interface title {
  url: string,
  title: string,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user_rol;
  isHome = true;
  possibleData: title[] = [
    { url: "/home", title: "Home" },
    { url: "/monitoring", title: "platform_monitoring_title" },
    { url: "/comparison", title: "platform_comparison_title" },
    { url: "/in-depth", title: "platform_in-depth_information_title" },
    { url: "/data_management", title: "platform_data_management_title" },
    { url: "/profile", title: "profile_title" },
    { url: "/", title: "home" }
  ];

  //Local language
  language: any;

  tituloActual: string = "";
  constructor(private router: Router,
    private userServices: UserDOAService,
    private location: Location) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeTitle();
      }
    });
    this.userServices.getUserRol.subscribe(name => this.user_rol = name);
  }

  logout() {
    //this.userServices.logout();
  }

  info() {
    const fileURL = constants.user_manual;
    window.open(fileURL, '_blank');
  }

  changeTitle() {
    for (var i of this.possibleData) {
      if (this.router.url === i.url) {
        if (this.router.url === "/home") {
          this.isHome = true;
        }
        else {
          this.isHome = false;
        }
        this.tituloActual = i.title;
      }
    }
  }

  backClicked() {
    this.location.back();
  }
}
