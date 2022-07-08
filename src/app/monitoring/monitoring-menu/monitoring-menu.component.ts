import { Component, OnInit, Input } from '@angular/core';
import *  as constants from '../../utilities/constants';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { Platform } from 'src/app/models/platform';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Component({
  selector: 'app-monitoring-menu',
  templateUrl: './monitoring-menu.component.html',
  styleUrls: ['./monitoring-menu.component.css']
})
export class MonitoringMenuComponent implements OnInit {

  platform: Platform;
  num_platforms: string;

  selected_tab_dimension = true;
  selected_tab_user_view = false;
  selected_tab_statistics = false;

  score_platform_selected_icon: string;

  constructor(private secureStorage: EncryptedStorageService) { }

  ngOnInit() {

    let f = new FunctionsComponent();
    this.platform = f.getPlatformSelected();
    this.num_platforms = this.secureStorage.decryptLocalSecureStorage(constants.lSN_numberPlatform);

    this.score_platform_selected_icon = f.getPlatformIconVariation(this.platform.global_trend)
  }


  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index == 0) {
      this.selected_tab_dimension = true;
      this.selected_tab_user_view = false;
      this.selected_tab_statistics = false;
    }
    else if (tabChangeEvent.index == 1) {
      this.selected_tab_dimension = false;
      this.selected_tab_user_view = true;
      this.selected_tab_statistics = false;
    }
    else if (tabChangeEvent.index == 2) {
      this.selected_tab_dimension = false;
      this.selected_tab_user_view = false;
      this.selected_tab_statistics = true;
    }
  }
}
