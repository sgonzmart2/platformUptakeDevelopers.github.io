import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'platformUpdate.eu';

  public isLogin = false;
  public isHome = false;
  public isForgotPass = false;

  constructor(private router: Router,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        //this.isLogin = ('/' === this.router.url);
        //this.isForgotPass = ('/forgot_password' === this.router.url);
        this.isHome = ('/' === this.router.url) || ('/home' === this.router.url);
      }
    });
  }

}
