import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import *  as constants from '../../utilities/constants';
import { FunctionsComponent } from '../../utilities/functions';
import { MatSort } from '@angular/material/sort';
import { MatOption } from '@angular/material/core';
import { Platform, platformTitles, PComparisonDataTableItemStatistics } from 'src/app/models/platform';
import { Period } from 'src/app/models/period';
import { StatisticsDOAService } from 'src/app/api/DOA/statistics-doa.service';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

export interface dataTableItem {
  position: number;
  platform: string;
  score: string;
  score_variation: string;
  score_variaton_icon: string,
  icon: string;
  page_views: number;
  bounce_rate: number;
  unique_visitors: number;
  users: number;
  new_users: number;
  sessions: number;
  sessions_per_user: number;
  pages_per_session: number;
}

@Component({
  selector: 'app-pc-statistics',
  templateUrl: './pc-statistics.component.html',
  styleUrls: ['./pc-statistics.component.css']
})
export class PCStatisticsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('allPlatforms') private allSelected: MatOption;
  @Input() selectedPlatforms: any[];
  @Output() selectedPlatformsUpdate = new EventEmitter<any>();
  firstTime = true;

  f = new FunctionsComponent();
  platformsTitles: platformTitles[];
  periods: Period[] = this.f.getValidStatisticsValuesPeriods();
  period_selected_id;

  tableDataSource: MatTableDataSource<dataTableItem>;
  allDataTableItems: dataTableItem[];

  defaultSelection: string[] = ["all_platforms"]

  columnsTitle: string[]
  statisticsTypes = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_statisticsTypes));

  isLoadingPlatforms = true;
  isLoadingStatistics = true;

  constructor(
    private secureStorage: EncryptedStorageService,
    private statisticsService: StatisticsDOAService) { }

  ngOnInit() {
    this.period_selected_id = this.periods[0].measurement_period_id;
    this.allDataTableItems = [];
    this.updateDataSource();
    this.refreshPageWithNewPeriod();
  }

  updateDataSource() {
    this.tableDataSource = new MatTableDataSource(this.allDataTableItems);
    this.tableDataSource.filterPredicate = (data: dataTableItem, filter: string) => {
      return this.selectedPlatforms.length > 0
        ? this.selectedPlatforms.some(platform => platform == data.platform)
        : true;
    }
    if (!this.firstTime) {
      this.updateView()
    }
  }

  ngAfterViewInit() {
    this.updateView()
    this.firstTime = false;
  }

  updateView() {
    this.tableDataSource.sort = this.sort;
    if (this.selectedPlatforms[0] == "all_platforms") {
      this.selectAllPlatforms()
    }
    else
      this.applyFilter()
  }

  selectAllPlatforms() {
    this.tableDataSource.filter = ''.trim().toLocaleLowerCase();
    this.selectedPlatformsUpdate.emit(this.defaultSelection)
  }

  applyFilter() {
    this.allSelected.deselect();
    this.selectedPlatformsUpdate.emit(this.selectedPlatforms)
    this.tableDataSource.filter = 'only used to trigger filter';
  }


  refreshPageWithNewPeriod() {
    this.isLoadingPlatforms = true;
    this.isLoadingStatistics = true

    this.allDataTableItems = [];
    this.updateDataSource();
    this.platformsTitles = []
    this.columnsTitle = ['platform'];
    let listTableItems = [];

    this.statisticsTypes.forEach(item => {
      this.columnsTitle.push(item.statistics_id + item.title);
    })


    let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));

    platformList.forEach(pltform => {
      let titlePlt: platformTitles = {
        key: pltform.platform_title,
        title: pltform.platform_title
      }
      this.platformsTitles.push(titlePlt)

      let statisticsValuesList = [];
      this.statisticsTypes.forEach(item => {
        statisticsValuesList[item.statistics_id] = "--"
      })

      let tableItem: PComparisonDataTableItemStatistics;

      tableItem = {

        platform: pltform.platform_title,
        icon: pltform.platform_logo_URL,
        statisticsValues: statisticsValuesList
      }
      listTableItems[pltform.platform_id] = tableItem;
      this.allDataTableItems.push(listTableItems[pltform.platform_id]);

    })
    this.isLoadingPlatforms = false;



    this.statisticsService.getStatisticsValuesByPeriod(this.period_selected_id).
      subscribe(result => {
        let listStatistics = result['statistics_values'];

        listStatistics.forEach(statisticValue => {
          let tableItem: PComparisonDataTableItemStatistics = listTableItems[statisticValue.platform_id]
          if (tableItem != undefined) {
            let listStatisticsValuesItem = tableItem.statisticsValues;
            listStatisticsValuesItem[statisticValue.statistics_id] = statisticValue.statistics_value
          }
        })

        this.isLoadingStatistics = false;
      })
    this.updateDataSource();
    this.selectAllPlatforms();
  }
}
