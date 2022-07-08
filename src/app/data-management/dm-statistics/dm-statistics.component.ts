import { Component, OnInit } from '@angular/core';
import { StatisticsDOAService } from 'src/app/api/DOA/statistics-doa.service';
import { NewStatistic, StatisticsValue } from 'src/app/models/statistics';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import *  as constants from '../../utilities/constants';

@Component({
  selector: 'app-dm-statistics',
  templateUrl: './dm-statistics.component.html',
  styleUrls: ['./dm-statistics.component.css']
})
export class DmStatisticsComponent implements OnInit {
  statistics_list = [];
  titleInserted = "";
  showNewStatistics = false;
  columnsTitle = [];
  submitted = false;
  isSaving = false;
  statistics_selected: StatisticsValue;
  constructor(
    private secureStorage: EncryptedStorageService,
    private statisticsService: StatisticsDOAService) { }

  ngOnInit() {

    this.columnsTitle = ['statistics_title', 'is_percentage', 'higher_is_better', 'edit_button'];

    this.statisticsService.updateStatisticsListInfo;
    this.statistics_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_statisticsTypes));


  }

  onSubmit() { }

  changeView() {
    this.isSaving = false;
    this.statistics_selected = new StatisticsValue();
    this.showNewStatistics = !this.showNewStatistics;
  }

  edit(data) {
    this.isSaving = false;
    this.statistics_selected = data;
    this.showNewStatistics = !this.showNewStatistics;
  }

  save() {
    this.isSaving = true;
    let body = {} as NewStatistic;
    if (this.statistics_selected.statistics_id != undefined) {
      body.statistics_id = this.statistics_selected.statistics_id;
    }
    /*else {
      //body.statistics_id = 0;
    }*/

    body.statistics_title = this.statistics_selected.title;
    body.ispercentage = this.statistics_selected.is_percentage;
    body.largerisbetter = this.statistics_selected.larger_is_better;

    this.statisticsService.insertNewStatistic(body).subscribe(
      response => {

        this.changeView();
        this.statisticsService.updateStatisticsListInfo;
      },
      error => {
        console.log("error", error)
        //this.statisticsService.updateStatisticsListInfo;
      });
  }


}
