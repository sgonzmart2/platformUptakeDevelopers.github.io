import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlatformsDOAService } from 'src/app/api/DOA/platforms-doa.service';
import *  as constants from '../../utilities/constants';
import { StatisticsDOAService } from 'src/app/api/DOA/statistics-doa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { newstatisticsListValues, NewStatisticsValueItemArrayPlatforms, NewStatisticValue } from 'src/app/models/statistics';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

export interface itemListStatisticsValue {
  statistic_id: number;
  value: string;
  title: string;
}

export interface platformInfo {
  listStatistics: itemListStatisticsValue[];
}

@Component({
  selector: 'app-dm-statistics-values',
  templateUrl: './dm-statistics-values.component.html',
  styleUrls: ['./dm-statistics-values.component.css']
})
export class DmStatisticsValuesComponent implements OnInit {
  @ViewChild("addEditValue") addEditValueModal: ElementRef;
  periods = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_measurementsPeriodStatisticsValues));
  period_selected_id;
  statistics_selected_title;
  period_selected_title;
  platform_selected_id;
  statistic_select_id;

  pltfm_title = "";
  platform_logo_URL = "";
  valueToChange = null;
  columnsTitle: string[]
  platforms = [];
  statistics_list = [];

  constructor(
    private platformServices: PlatformsDOAService,
    private secureStorage: EncryptedStorageService,
    private modalService: NgbModal,
    private statisticsService: StatisticsDOAService) { }

  ngOnInit() {
    this.period_selected_id = this.periods[0].measurement_period_id;
    this.refreshPageWithNewPeriod();
    this.columnsTitle = ['statistics_title', 'value', 'edit_button'];
  }


  refreshPageWithNewPeriod() {
    this.period_selected_title = "";
    let indexPeriod = this.periods.findIndex(x => x.measurement_period_id === this.period_selected_id);
    if (indexPeriod > -1) {
      this.period_selected_title = this.periods[indexPeriod].measurement_period_title;
    }
    this.statistics_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_statisticsTypes));
    this.platforms = [];
    this.platformServices.updatePlatformsInfo();
    this.statisticsService.updateStatisticsListInfo();
    let platforms_info = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));
    platforms_info.forEach(item => {
      let statisticsValues: itemListStatisticsValue[] = [];

      this.statistics_list.forEach(stat => {
        let statValue = {} as itemListStatisticsValue;
        statValue.title = stat.title;
        statValue.value = '--';
        statValue.statistic_id = stat.statistics_id
        statisticsValues.push(statValue);
      })

      let platInfo: platformInfo;
      platInfo = item;
      platInfo.listStatistics = statisticsValues;
      this.platforms.push(platInfo);
    })

    this.statisticsService.getStatisticsValuesByPeriod(this.period_selected_id).
      subscribe(result => {
        let listStatistics = result['statistics_values'];
        listStatistics.forEach(itemValue => {
          let index = this.platforms.findIndex(x => x.platform_id === itemValue.platform_id);
          if (index > -1) {
            let listValuesSta = this.platforms[index].listStatistics;
            let index2 = listValuesSta.findIndex(x => x.statistic_id === itemValue.statistics_id);
            if (index2 > -1) {
              listValuesSta[index2].value = itemValue.statistics_value;
              this.platforms[index].listStatistics = listValuesSta;
            }
          }
        })
      })
  }

  edit(pltform_id, statistic_id) {
    this.platform_selected_id = pltform_id;
    this.statistic_select_id = statistic_id;
    let index = this.platforms.findIndex(x => x.platform_id === pltform_id);
    if (index > -1) {
      let platformInfor = this.platforms[index]

      let listValuesSta = this.platforms[index].listStatistics;
      let index2 = listValuesSta.findIndex(x => x.statistic_id === statistic_id);
      if (index2 > -1) {
        this.statistics_selected_title = listValuesSta[index2].title
        if (listValuesSta[index2].value != "--") {
          this.valueToChange = listValuesSta[index2].value;
        }
        else {
          this.valueToChange = null;
        }
      }

      this.pltfm_title = platformInfor.title;
      this.platform_logo_URL = platformInfor.platform_logo_URL;


      this.modalService.open(this.addEditValueModal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
    }

  }

  save() {
    let body = {} as NewStatisticValue;
    body.period_id = this.period_selected_id;
    body.platforms_with_statistics = [];

    let listPlatforms = {} as NewStatisticsValueItemArrayPlatforms;
    listPlatforms.platform_id = this.platform_selected_id;
    listPlatforms.statistics_values = [];

    let listStatisticsnewValues = {} as newstatisticsListValues;

    listStatisticsnewValues.statistics_id = this.statistic_select_id;
    listStatisticsnewValues.statistics_value = this.valueToChange;

    listPlatforms.statistics_values.push(listStatisticsnewValues);
    body.platforms_with_statistics.push(listPlatforms);

    this.statisticsService.insertNewStatisticValue(body).subscribe(
      response => {
        this.modalService.dismissAll();
        this.refreshPageWithNewPeriod();
      },
      error => {
        console.log("error", error)
        this.modalService.dismissAll();
        this.refreshPageWithNewPeriod();
      });;
  }
}