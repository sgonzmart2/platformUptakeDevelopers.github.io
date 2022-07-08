import { Component, OnInit } from '@angular/core';
import { Platform } from 'src/app/models/platform';
import { FunctionsComponent } from 'src/app/utilities/functions';
import *  as constants from '../../utilities/constants';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-deep-platform-selector',
  templateUrl: './in-deep-platform-selector.component.html',
  styleUrls: ['./in-deep-platform-selector.component.css']
})
export class InDeepPlatformSelectorComponent implements OnInit {
  arrayPlatforms: any[];
  f = new FunctionsComponent();

  constructor(
    private secureStorage: EncryptedStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    let user = JSON.parse(this.secureStorage.decryptSecureStorage(constants.user_info));
    let f = new FunctionsComponent();
    if (f.getRol(user.role_id) == constants.rol.Own) {
      if (user.corresponding_platform_id.length == 1) {
        let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));
        platformList.forEach(p => {
          if (p.platform_id == user.corresponding_platform_id) {
            this.router.navigate(['/in-depth_menu'], { skipLocationChange: true });
            this.f.setSelectPlatform(p);
          }
        })
      }
      else if (user.corresponding_platform_id.length > 1) {
        this.arrayPlatforms = [];
        let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));
        let platformsUser = []
        platformList.forEach(p => {

          let index = user.corresponding_platform_id.findIndex(x => x === p.platform_id);
          if (index != -1) {
            platformsUser.push(p)
          }
        })
        var arraySize = 4;
        for (var i = 0; i < Math.ceil(platformsUser.length / arraySize); i++) {
          this.arrayPlatforms.push(platformsUser.slice(i * arraySize, i * arraySize + arraySize));
        }
      }
    }
    else {
      this.getPlatformsData();
    }
  }

  getPlatformsData() {
    this.arrayPlatforms = [];
    let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));
    /*this.platformServices.getPlatformsData().subscribe(
      response => {
        let platforms = response['platforms'];
        platforms.forEach(item => {
          let pltfrm: Platform = item;

          pltfrm.img = this.f.getPlatformIcon(pltfrm.platform_title)
          platformList.push(pltfrm);
        });

      });
*/
    var arraySize = 4;
    for (var i = 0; i < Math.ceil(platformList.length / arraySize); i++) {
      this.arrayPlatforms.push(platformList.slice(i * arraySize, i * arraySize + arraySize));
    }
  }

  selectPlatform(plt: Platform) {
    this.f.setSelectPlatform(plt);
  }
}
