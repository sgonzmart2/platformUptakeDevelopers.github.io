import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodDoaService } from 'src/app/api/DOA/period-doa.service';
import { newPeriod, PeriodClass, Period } from 'src/app/models/period';
import *  as constants from '../../utilities/constants';
import { DatePipe } from '@angular/common';
import { FunctionsComponent } from 'src/app/utilities/functions';
import { MatSort } from '@angular/material/sort';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

export interface listPeriodsByType {
  periodTitle: string;
  periodList: Period[];
}


@Component({
  selector: 'app-dm-measurement-period',
  templateUrl: './dm-measurement-period.component.html',
  styleUrls: ['./dm-measurement-period.component.css']
})
export class DmMeasurementPeriodComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  //all_periods = [];
  showNewPeriod = false;
  columnsTitle = [];
  submitted = false;
  isLoading = true;

  errorMsg = "";
  periods_type_names = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_periodTypes));
  all_periods: Period[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_allMeasurementsPeriod));
  period_selected: PeriodClass;
  listToShow: listPeriodsByType[] = [];
  isSaving = false;
  constructor(private periodsService: PeriodDoaService,
    private datePipe: DatePipe,
    private secureStorage: EncryptedStorageService
  ) {
    let f = new FunctionsComponent();
    this.periods_type_names.forEach(typeP => {
      let lPeriodByType = {} as listPeriodsByType;
      lPeriodByType.periodList = f.getMeasurementsListByType(this.all_periods, typeP.periodtype_title)
      lPeriodByType.periodTitle = typeP.periodtype_title;

      this.listToShow.push(lPeriodByType);
    })
  }

  ngOnInit() {
    this.columnsTitle = ['period_title', 'period_ready', 'from', 'until', 'edit_button'];
    this.loadData();
  }

  loadData() {
    this.listToShow = []
    let f = new FunctionsComponent();
    this.periodsService.getPeriodValuesList().subscribe(
      response => {
        let list = response['measurement_periods'];

        let finalList = []
        list.forEach(element => {
          if (element.period_type_title === "KPI measurement") {
            finalList.push(element);
          }
          else if (element.period_type_title === "Statistics measurement") {
            finalList.push(element);
          }
        });

        this.secureStorage.secureLocalStorage(constants.lSN_allMeasurementsPeriod, JSON.stringify(finalList))
        this.all_periods = finalList;
        this.periods_type_names.forEach(typeP => {
          let lPeriodByType = {} as listPeriodsByType;
          lPeriodByType.periodList = f.getMeasurementsListByType(this.all_periods, typeP.periodtype_title)
          lPeriodByType.periodTitle = typeP.periodtype_title;

          this.listToShow.push(lPeriodByType);
        })
        this.isLoading = false;
      });
    this.periodsService.updatePeriods();
  }

  onSubmit() { }

  edit(data) {
    this.isSaving = false;
    this.period_selected = data;
    this.period_selected.isReady = !this.period_selected.flagged
    this.showNewPeriod = !this.showNewPeriod;
  }

  save() {
    this.isSaving = true;
    let body = {} as newPeriod;
    if (this.period_selected.measurement_period_id != undefined) {
      body.period_id = this.period_selected.measurement_period_id;
    }
    else {
      body.period_id = 0;
    }

    body.period_title = this.period_selected.measurement_period_title;
    body.flagged = !this.period_selected.isReady;
    body.period_datefrom = this.datePipe.transform(this.period_selected.from_date, 'yyyy-MM-dd').toString();
    body.period_dateuntil = this.datePipe.transform(this.period_selected.until_date, 'yyyy-MM-dd').toString();
    body.periodtype_id = this.period_selected.period_type

    this.periodsService.insertNewPeriod(body).subscribe(
      response => {
        this.loadData();
        this.changeView();
      },
      error => {
        this.errorMsg = "An unexpected error has occurred: " + error.status + " " + error.statusText
      });
  }

  changeView() {
    this.isSaving = false;
    this.period_selected = new PeriodClass();
    this.showNewPeriod = !this.showNewPeriod;
  }
}
