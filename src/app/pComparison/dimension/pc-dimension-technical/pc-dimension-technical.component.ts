import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlatformsDOAService } from 'src/app/api/DOA/platforms-doa.service';
import *  as constants from '../../../utilities/constants';
import { FunctionsComponent } from '../../../utilities/functions';
import { MatSort } from '@angular/material/sort';
import { MatOption } from '@angular/material/core';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { KPIs } from 'src/app/models/kpis';
import { platformTitles, PComparisonDataTableItemDetail, Platform } from 'src/app/models/platform';
import { Period } from 'src/app/models/period';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import * as config_variables from '../../../utilities/config_variables';

@Component({
  selector: 'app-pc-dimension-technical',
  templateUrl: './pc-dimension-technical.component.html',
  styleUrls: ['./pc-dimension-technical.component.css']
})
export class PCDimensionTechnicalComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('allPlatforms') private allSelected: MatOption;
  @Input() selectedPlatforms: any[];
  @Output() selectedPlatformsUpdate = new EventEmitter<any>();
  firstTime = true;
  f = new FunctionsComponent();
  platformsTitles: platformTitles[];
  periods: Period[] = this.f.getValidKPIValuesPeriods();
  period_selected_id;
  dim_id: number = this.f.getKPIDimensionIdByAbbreviation('T');
  KPIs_list = [];
  isLoadingPlatforms = true;
  isLoadingScores = true;
  isLoadingKPIsValues = true;
  tableDataSource: MatTableDataSource<PComparisonDataTableItemDetail>;
  allDataTableItems: PComparisonDataTableItemDetail[];

  defaultSelection: string[] = ["all_platforms"]

  columnsTitle: string[]

  listKPIs: KPIs[];
  constructor(private platformServices: PlatformsDOAService,
    private secureStorage: EncryptedStorageService,
    private kpiServices: KpiDoaService) { }

  ngOnInit() {
    if (config_variables.selectedPeriod[0] == null)
      this.period_selected_id = this.periods[0].measurement_period_id;
    else {
      this.period_selected_id = config_variables.selectedPeriod[0]
    }
    this.allDataTableItems = [];
    this.updateDataSource();
    this.listKPIs = this.f.getTypeDimensionKPIsList(constants.KPI_dimension.T);
    this.refreshPageWithNewPeriod();
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
    this.updatePosition()
    this.selectedPlatformsUpdate.emit(this.defaultSelection)
  }

  applyFilter() {
    this.allSelected.deselect();
    this.selectedPlatformsUpdate.emit(this.selectedPlatforms)
    this.updatePosition()
    this.tableDataSource.filter = 'only used to trigger filter';
  }

  refreshPageWithNewPeriod() {
    config_variables.selectedPeriod[0] = this.period_selected_id;
    this.isLoadingPlatforms = true;
    this.isLoadingKPIsValues = true;
    this.isLoadingScores = true;

    this.allDataTableItems = [];
    this.updateDataSource();
    this.platformsTitles = []
    this.columnsTitle = ['position', 'platform', 'score_variation', 'score'];

    let listTableItems = [];
    let indexKPI = 0;
    this.listKPIs.forEach(item => {
      let title = 'KPI_'
      if (item.kpi_id < 10) {
        title += '0'
      }
      title += item.kpi_id;
      this.listKPIs[indexKPI].complete_id = title;
      indexKPI++;
      this.columnsTitle.push(title);
    })

    let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));

    platformList.forEach(pltform => {
      let titlePlt: platformTitles = {
        key: pltform.platform_title,
        title: pltform.platform_title
      }
      this.platformsTitles.push(titlePlt)

      let listKPISTable = [];
      this.listKPIs.forEach(item => {
        listKPISTable[item.kpi_id] = "-1"
      })


      let tableItem: PComparisonDataTableItemDetail;

      tableItem = {
        position: null,
        platform: pltform.platform_title,
        score: null,
        score_variaton_icon: this.f.getPlatformIconVariation(NaN),
        icon: pltform.platform_logo_URL,
        KPIsValues: listKPISTable
      }
      listTableItems[pltform.platform_id] = tableItem;
      this.allDataTableItems.push(listTableItems[pltform.platform_id]);

    })
    this.isLoadingPlatforms = false;

    this.platformServices.getGlobalScoreByPeriodIdAndTypeOfScore(this.period_selected_id, constants.type_KPI.dimension, this.dim_id).
      subscribe(response => {
        let list_scores = response['scores_and_trends'];
        list_scores.sort(function (a, b) {
          return b.score - a.score;
        });
        let previousScore = -1;
        let currentPosition = 0;
        let previousPosition = 1;
        list_scores.forEach(scoreItem => {
          currentPosition++;
          if (Number(scoreItem.score) < previousScore || previousScore == -1) {
            previousScore = Number(scoreItem.score)
            previousPosition = currentPosition
          }

          let tableItem: PComparisonDataTableItemDetail = listTableItems[scoreItem.platform_id]
          tableItem.score = scoreItem.score
          tableItem.position = previousPosition.toString();
          tableItem.score_variaton_icon = this.f.getPlatformIconVariation(scoreItem.trend_status)
        })
        this.isLoadingScores = false;
        this.updateView()
      });

    this.kpiServices.getKPIsDimensionValuesByPeriod(this.period_selected_id, this.dim_id).
      subscribe(kpi_list => {
        let listValues = kpi_list['KPI_values'];

        listValues.forEach(kpiValue => {
          let tableItem: PComparisonDataTableItemDetail = listTableItems[kpiValue.platform_id]
          if (tableItem != undefined) {
            let listKpisValues = tableItem.KPIsValues;
            listKpisValues[kpiValue.kpi_id] = kpiValue.normalized_value + " (" + kpiValue.original_value + ")"
          }
        })

        this.isLoadingKPIsValues = false;
      })
    this.updateDataSource();
  }

  updateDataSource() {
    this.tableDataSource = new MatTableDataSource(this.allDataTableItems);
    this.tableDataSource.filterPredicate = (data: PComparisonDataTableItemDetail, filter: string) => {
      return this.selectedPlatforms.length > 0
        ? this.selectedPlatforms.some(platform => platform == data.platform)
        : true;
    }
    this.tableDataSource.sortingDataAccessor = (item, property) => {
      if (null == item[property]) {
        if ("desc" == this.sort.direction) return '\u0000' + '\u0000' + '\u0000';
        return '\uFFFF' + '\uFFFF' + '\uFFFF';
      }
      return item[property];
    };
    if (!this.firstTime) {
      this.updateView()
    }
  }

  updatePosition() {
    let previousScore = -1;
    let currentPosition = 0;
    let previousPosition = 1;
    let arrayPositions = []
    if (this.selectedPlatforms[0] != "all_platforms") {
      this.selectedPlatforms.forEach(x => {
        this.allDataTableItems.forEach(y => {
          if (x == y.platform) {
            arrayPositions.push(y)
          }
        })
      })

      arrayPositions.sort(function (a, b) {
        return b.score - a.score;
      });

      arrayPositions.forEach(scoreItem => {
        if (scoreItem.score != null) {
          currentPosition++;
          if (Number(scoreItem.score) < previousScore || previousScore == -1) {
            previousScore = Number(scoreItem.score)
            previousPosition = currentPosition
          }
          scoreItem.position = previousPosition.toString();
        }
      })
    }
    else {
      arrayPositions = this.allDataTableItems
      arrayPositions.sort(function (a, b) {
        return b.score - a.score;
      });

      arrayPositions.forEach(scoreItem => {
        if (scoreItem.score != null) {
          currentPosition++;
          if (Number(scoreItem.score) < previousScore || previousScore == -1) {
            previousScore = Number(scoreItem.score)
            previousPosition = currentPosition
          }
          scoreItem.position = previousPosition.toString();
        }
      })
    }
  }
}
