import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlatformsDOAService } from './api/DOA/platforms-doa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatformUptake';

  constructor(
    private translateService: TranslateService,
    private platformService: PlatformsDOAService) {
    this.platformService.getInitialPlatformsData();
    this.translateService.setDefaultLang("en");
    /*var language = this.secureStorage.decryptLocalSecureStorage("language");
    if (language != undefined) {
      this.translateService.setDefaultLang(language);
    }
    else {
      this.translateService.setDefaultLang("en");
    }*/


  }


}
