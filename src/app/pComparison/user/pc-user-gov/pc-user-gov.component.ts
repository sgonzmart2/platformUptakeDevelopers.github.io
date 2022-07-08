import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlatformsDOAService } from 'src/app/api/DOA/platforms-doa.service';
import *  as constants from '../../../utilities/constants';
import { FunctionsComponent } from '../../../utilities/functions';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { KPIs } from 'src/app/models/kpis';
import { platformTitles, PComparisonDataTableItemDetail, Platform } from 'src/app/models/platform';
import { Period } from 'src/app/models/period';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';

@Component({
  selector: 'app-pc-user-gov',
  templateUrl: './pc-user-gov.component.html',
  styleUrls: ['./pc-user-gov.component.css']
})
export class PCUserGovComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('allPlatforms') private allSelected: MatOption;

  f = new FunctionsComponent();

  platformsTitles: platformTitles[];
  periods: Period[] = this.f.getValidKPIValuesPeriods();
  period_selected_id;

  tableDataSource: MatTableDataSource<PComparisonDataTableItemDetail>;
  allDataTableItems: PComparisonDataTableItemDetail[];

  defaultSelection: string[] = ["all_platforms"]

  columnsTitle: string[]

  selectedPlatforms: any[]

  platformsSelected = new FormControl();
  listKPIs: KPIs[];

  isLoadingPlatforms = true;
  isLoadingScores = true;
  isLoadingKPIsValues = true;
  cluster_id: number = this.f.getKPIClusterIdByAbbreviation(constants.KPI_cluster.GOV);

  constructor(private platformServices: PlatformsDOAService,
    private secureStorage: EncryptedStorageService,
    private kpiServices: KpiDoaService) { }

  ngOnInit() {
    this.period_selected_id = this.periods[0].measurement_period_id;
    this.selectedPlatforms = [];
    this.allDataTableItems = [];
    this.updateDataSource();
    this.listKPIs = this.f.getTypeClusterKPIsList(constants.KPI_cluster.GOV);
    this.refreshPageWithNewPeriod();
  }

  ngAfterViewInit() {
    this.tableDataSource.sort = this.sort;
    setTimeout(() => {
      this.platformsSelected.setValue(this.defaultSelection)
    });
  }

  selectAllPlatforms() {
    this.tableDataSource.filter = ''.trim().toLocaleLowerCase();
    this.platformsSelected.setValue(this.defaultSelection)
  }

  applyFilter() {
    this.allSelected.deselect();
    this.tableDataSource.filter = 'only used to trigger filter';
  }

  refreshPageWithNewPeriod() {
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
        listKPISTable[item.kpi_id] = "--"
      })


      let tableItem: PComparisonDataTableItemDetail;

      let position = "--";
      if (pltform.global_ranking > 0) {
        position = pltform.global_ranking.toString();
      }
      tableItem = {
        position: position,
        platform: pltform.platform_title,
        score: "--",
        score_variaton_icon: this.f.getPlatformIconVariation(NaN),
        icon: pltform.platform_logo_URL,
        KPIsValues: listKPISTable
      }
      listTableItems[pltform.platform_id] = tableItem;
      this.allDataTableItems.push(listTableItems[pltform.platform_id]);

    })
    this.isLoadingPlatforms = false;

    this.platformServices.getGlobalScoreByPeriodIdAndTypeOfScore(this.period_selected_id, constants.type_KPI.cluster, this.cluster_id).
      subscribe(response => {
        let list_scores = response['scores_and_trends'];
        list_scores.forEach(scoreItem => {
          let tableItem: PComparisonDataTableItemDetail = listTableItems[scoreItem.platform_id]
          tableItem.score = scoreItem.score;
          tableItem.score_variaton_icon = this.f.getPlatformIconVariation(scoreItem.trend_status)
        })
        this.isLoadingScores = false;
      });

    this.kpiServices.getKPIsClusterValuesByPeriod(this.period_selected_id, this.cluster_id).
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
    this.selectAllPlatforms();
  }

  updateDataSource() {
    this.tableDataSource = new MatTableDataSource(this.allDataTableItems);
    this.tableDataSource.filterPredicate = (data: PComparisonDataTableItemDetail, filter: string) => {
      return this.selectedPlatforms.length > 0
        ? this.selectedPlatforms.some(platform => platform == data.platform)
        : true;
    }
  }
}
