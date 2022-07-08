import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlatformsDOAService } from 'src/app/api/DOA/platforms-doa.service';
import *  as constants from '../../utilities/constants';
import { FunctionsComponent } from '../../utilities/functions';
import { MatSort } from '@angular/material/sort';
import { MatOption } from '@angular/material/core';
import { platformTitles, PComparisonDataTableItemGS, Platform } from 'src/app/models/platform';
import { Period } from 'src/app/models/period';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import * as config_variables from '../../utilities/config_variables';

@Component({
  selector: 'app-pc-global-score',
  templateUrl: './pc-global-score.component.html',
  styleUrls: ['./pc-global-score.component.css']
})
export class PCGlobalScoreComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('allPlatforms') private allSelected: MatOption;
  @Input() selectedPlatforms: any[];
  @Output() selectedPlatformsUpdate = new EventEmitter<any>();

  f = new FunctionsComponent();

  platformsTitles: platformTitles[];

  period_selected_id;
  isLoadingPlatforms = true;
  isLoadingScores = true;
  firstTime = true;

  tableDataSource: MatTableDataSource<PComparisonDataTableItemGS>;
  allDataTableItems: PComparisonDataTableItemGS[];

  defaultSelection: string[] = ["all_platforms"]

  columnsTitle: string[] = ['position', 'platform', 'score_variation', 'score'];

  periods: Period[] = this.f.getValidKPIValuesPeriods();
  constructor(private platformServices: PlatformsDOAService,
    private secureStorage: EncryptedStorageService) { }

  ngOnInit() {
    if (config_variables.selectedPeriod[0] == null)
      this.period_selected_id = this.periods[0].measurement_period_id;
    else {
      this.period_selected_id = config_variables.selectedPeriod[0]
    }
    this.allDataTableItems = [];
    this.updateDataSource();
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
    this.updatePosition()
    this.selectedPlatformsUpdate.emit(this.selectedPlatforms)
    this.tableDataSource.filter = 'only used to trigger filter';
  }

  refreshPageWithNewPeriod() {
    config_variables.selectedPeriod[0] = this.period_selected_id;
    this.isLoadingPlatforms = true;
    this.isLoadingScores = true;
    this.allDataTableItems = [];
    this.updateDataSource();
    this.platformsTitles = []
    this.columnsTitle = ['position', 'platform', 'score_variation', 'score'];

    let listTableItems = [];
    let platformList: Platform[] = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_platformsList));

    platformList.forEach(pltform => {
      let titlePlt: platformTitles = {
        key: pltform.platform_title,
        title: pltform.platform_title
      }
      this.platformsTitles.push(titlePlt)

      let tableItem: PComparisonDataTableItemGS;
      tableItem = {
        position: null,
        platform: pltform.platform_title,
        score: null,
        score_variaton_icon: this.f.getPlatformIconVariation(NaN),
        icon: pltform.platform_logo_URL,
      }
      listTableItems[pltform.platform_id] = tableItem;
      this.allDataTableItems.push(listTableItems[pltform.platform_id]);

    })
    this.isLoadingPlatforms = false;

    this.platformServices.getPlatformsGlobalScoreByPeriod(this.period_selected_id).
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
          if (scoreItem.score < previousScore || previousScore == -1) {
            previousScore = scoreItem.score
            previousPosition = currentPosition
          }

          let tableItem: PComparisonDataTableItemGS = listTableItems[scoreItem.platform_id]
          tableItem.score = scoreItem.score.toString();
          tableItem.position = previousPosition.toString();
          tableItem.score_variaton_icon = this.f.getPlatformIconVariation(scoreItem.trend_status)
        })
        this.isLoadingScores = false;
        this.updateView()
      });
    this.updateDataSource();
  }

  updateDataSource() {
    this.tableDataSource = new MatTableDataSource(this.allDataTableItems);
    this.tableDataSource.filterPredicate = (data: PComparisonDataTableItemGS, filter: string) => {
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
          if (scoreItem.score < previousScore || previousScore == -1) {
            previousScore = scoreItem.score
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
          if (scoreItem.score < previousScore || previousScore == -1) {
            previousScore = scoreItem.score
            previousPosition = currentPosition
          }
          scoreItem.position = previousPosition.toString();
        }
      })
    }
  }
}
