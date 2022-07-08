import { Component, OnInit } from '@angular/core';
import { PlatformsDOAService } from '../api/DOA/platforms-doa.service';
import { FunctionsComponent } from '../utilities/functions';
import { KpiDoaService } from '../api/DOA/kpi-doa.service';
import { PeriodDoaService } from '../api/DOA/period-doa.service';
import { StatisticsDOAService } from '../api/DOA/statistics-doa.service';
import { ContextualQDOAService } from '../api/DOA/contextual-q-doa.service';
import { ModalNoAuthComponent } from '../components/modal-no-auth/modal-no-auth.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserDOAService } from '../api/DOA/user-doa.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ModalNoPermisionsComponent } from '../components/modal-no-permisions/modal-no-permisions.component';
import *  as constants from '../utilities/constants';
import { EncryptedStorageService } from '../utilities/encryptedStorageService';
import * as config_variables from '../utilities/config_variables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  f = new FunctionsComponent();
  isLoaded = false;
  isLogged = false;
  isAdmin = false;
  allowInDeep = false;

  constructor(private kpisServices: KpiDoaService,
    private periodDoaService: PeriodDoaService,
    private statisticsService: StatisticsDOAService,
    private platformService: PlatformsDOAService,
    private auth: AuthGuard,
    private secureStorage: EncryptedStorageService,
    public matDialog: MatDialog,
    private router: Router,
    private userDao: UserDOAService,
    private cQService: ContextualQDOAService) { }

  ngOnInit() {
    this.isLogged = this.auth.userIsLogged();
    this.isAdmin = this.userDao.allowToInDeep();

    this.allowInDeep = this.userDao.allowToInDeep();
    this.getTypesOfElements();
    this.getInitialValues();
    this.loadPage();
  }


  getTypesOfElements() {
    //Type of periods
    this.periodDoaService.updatePeriodsType();

    //type of KPI categories
    this.kpisServices.updateKPIsCategories();

    //type of KPI clusters
    this.kpisServices.updateKPIsClusters();

    //type of KPI dimensions:
    this.kpisServices.updateKPIsDimension();

    //type of statistics
    this.statisticsService.getTypeOfStatistics();

    //contextual questions
    this.cQService.getContextualQuestions();

    // type developers cuestion
    this.cQService.updateDeveloperQuestionTypes();

    this.periodDoaService.updateAllPeriods();
  }

  getInitialValues() {
    //Get platfom list
    this.platformService.updatePlatformsInfo();

    //Get KPIs list
    this.kpisServices.updateKPIsListInfo();

    //Get period list
    this.periodDoaService.updatePeriods();
  }

  goToInDeep() {
    if (this.allowInDeep) {
      this.router.navigate(['in-depth']);
    }
    else if (this.isLogged) {
      this.matDialog.open(ModalNoPermisionsComponent);
    }
    else {
      this.matDialog.open(ModalNoAuthComponent);
    }
  }

  goToAdmin() {
    if (this.isAdmin) {
      this.router.navigate(['data_management']);
    }
    else if (this.isLogged) {
      this.matDialog.open(ModalNoPermisionsComponent);
    }
    else {
      this.matDialog.open(ModalNoAuthComponent);
    }
  }

  loadPage() {
    config_variables.selectedPeriod[0] = null
    var value = this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList) != null
    async function waitForMeaningOfLife(): Promise<boolean> {
      while (true) {
        let secureStore = new EncryptedStorageService()
        value = secureStore.decryptLocalSecureStorage(constants.lSN_platformsList) != null
        if (value) {
          return true
        }
        await new Promise(resolve => {
          setTimeout(resolve, 10)
        })
      }
    }
    waitForMeaningOfLife().then(() => {
      this.isLoaded = true;
    }
    );
    setTimeout(() => value = this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList) != null, 10);
    this.isLoaded = value;
  }
}
