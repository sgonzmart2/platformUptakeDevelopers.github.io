import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import *  as constants from '../utilities/constants';
import { EncryptedStorageService } from '../utilities/encryptedStorageService';
import { FunctionsComponent } from '../utilities/functions';

@Component({
  selector: 'app-in-depth-information',
  templateUrl: './in-depth-information.component.html',
  styleUrls: ['./in-depth-information.component.css']
})
export class InDepthInformationComponent implements OnInit {

  selected_tab_ratings = true;
  selected_tab_feedback = false;
  platform: any;
  backToPlatforms = false
  constructor(
    private storageSecure: EncryptedStorageService
  ) { }

  ngOnInit() {
    let user = JSON.parse(this.storageSecure.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();
    if (f.getRol(user.role_id) == constants.rol.GAdmin || f.getRol(user.role_id) == constants.rol.PAdmin) {
      this.backToPlatforms = true;
    }
    else {
      if (user.corresponding_platform_id.length > 1) {
        this.backToPlatforms = true;
      }
    }

    this.platform = f.getPlatformSelected();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_ratings = true;
      this.selected_tab_feedback = false;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_ratings = false;
      this.selected_tab_feedback = true;
    }
  }

}
