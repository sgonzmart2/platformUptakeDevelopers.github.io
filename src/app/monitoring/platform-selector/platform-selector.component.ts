import { Component, OnInit } from '@angular/core';
import { Platform } from 'src/app/models/platform';
import *  as constants from '../../utilities/constants';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import * as config_variables from '../../utilities/config_variables';

@Component({
  selector: 'app-platform-selector',
  templateUrl: './platform-selector.component.html',
  styleUrls: ['./platform-selector.component.css']
})
export class PlatformSelectorComponent implements OnInit {
  arrayPlatforms: any[];

  f = new FunctionsComponent();
  constructor(private secureStorage: EncryptedStorageService) { }

  ngOnInit() {
    this.getPlatformsData();
  }

  getPlatformsData() {
    config_variables.selectedPeriod[0] = null
    this.arrayPlatforms = [];
    let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));

    var arraySize = 4;
    for (var i = 0; i < Math.ceil(platformList.length / arraySize); i++) {
      this.arrayPlatforms.push(platformList.slice(i * arraySize, i * arraySize + arraySize));
    }
  }

  selectPlatform(plt: Platform) {
    this.f.setSelectPlatform(plt);
  }
}
