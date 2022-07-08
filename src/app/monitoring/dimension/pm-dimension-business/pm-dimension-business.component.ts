import { Component, OnInit } from '@angular/core';
import { kpiMonitoringDataTable, KPIs, KPIsValues, KPI_weights, KPI_weightsToSend, MyKPIsValues } from '../../../models/kpis';
import { FunctionsComponent } from '../../../utilities/functions';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import *  as constants from '../../../utilities/constants';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalEvolutionComponent } from 'src/app/components/modal-evolution/modal-evolution.component';
import { Platform } from 'src/app/models/platform';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { ScoresDOAService } from 'src/app/api/DOA/scores-doa.service';
import { ModalEvolutionKpiComponent } from 'src/app/components/modal-evolution-kpi/modal-evolution-kpi.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UserDOAService } from 'src/app/api/DOA/user-doa.service';
import { userWeights } from 'src/app/models/user';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import * as config_variables from '../../../utilities/config_variables';

@Component({
  selector: 'app-pm-dimension-business',
  templateUrl: './pm-dimension-business.component.html',
  styleUrls: ['./pm-dimension-business.component.css']
})
export class PMDimensionBusinessComponent implements OnInit {
  radius = 35;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;
  cx = 50;
  cy = 60;

  isLoadingScore = true
  score;

  f = new FunctionsComponent();
  periods = this.f.getValidKPIValuesPeriods();
  period_selected_id;

  KPIs_list = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_KPIs_list));
  bussinessKPIs: KPIs[] = [];

  platformSelected: Platform = this.f.getPlatformSelected();
  dim_id: number = this.f.getKPIDimensionIdByAbbreviation('B');

  KPI_valuesList: KPIsValues[] = [];

  displayKPIs: any = [];

  title_graph = "";
  evolution_kpi_id = "";

  showGraph = false;

  isWeightChanged = false;
  isLogged = false;
  tableDataSource: MatTableDataSource<kpiMonitoringDataTable>;
  allDataTableItems: kpiMonitoringDataTable[];

  columnsTitle: string[];

  userWeights = []
  userWeightsOtherKPI = []
  public chartNormalizedEvolution: ChartDataSets[] = [
    { data: [], fill: false, hoverBackgroundColor: "rgb(35, 166, 173)", backgroundColor: "rgb(35, 166, 173)", label: '' }
  ];

  public chartOriginalEvolution: ChartDataSets[] = [
    { data: [], fill: false, hoverBackgroundColor: "rgb(35, 166, 173)", backgroundColor: "rgb(35, 166, 173)", label: '' }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1,
          suggestedMin: 0,
          suggestedMax: 1,
        }
      }]
    },

    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }

  };

  public barChartNormalLabels: Label[];
  public barChartOriginalLabels: Label[];

  constructor(
    private kpiServices: KpiDoaService,
    private auth: AuthGuard,
    private secureStorage: EncryptedStorageService,
    private userDOA: UserDOAService,
    public matDialog: MatDialog,
    private scoresService: ScoresDOAService) {
    this.isLogged = this.auth.userIsLogged();
    if (this.isLogged) {
      this.columnsTitle = ['KPI_ID', 'KPI_title', 'original_value', 'normalized_value', 'default_weight', 'minus', 'weight', 'plus', 'restore_weight'];
    }
    else {
      this.columnsTitle = ['KPI_ID', 'KPI_title', 'original_value', 'normalized_value', 'default_weight'];
    }
  }


  ngOnInit() {
    this.bussinessKPIs = this.f.getTypeDimensionKPIsList(constants.KPI_dimension.B);
    if (config_variables.selectedPeriod[0] == null)
      this.period_selected_id = this.periods[0].measurement_period_id;
    else {
      this.period_selected_id = config_variables.selectedPeriod[0]
    }
    this.refreshPageWithNewPeriod();
  }

  refreshPageWithNewPeriod() {
    config_variables.selectedPeriod[0] = this.period_selected_id;
    this.userWeights = this.userDOA.getUserWeigths();
    this.kpiServices.getKPIsValuesByPlatformPeriodDimension(this.platformSelected.platform_id, this.period_selected_id, this.dim_id).
      subscribe(kpi_list => {

        this.KPI_valuesList = kpi_list['KPI_values'];
        let KPIsList: KPIsValues[] = [];
        this.allDataTableItems = [];
        this.userWeights.forEach(weight => {
          let isInKPIList = false;
          this.KPI_valuesList.forEach(kpiValue => {
            if (weight.kpi_id == kpiValue.kpi_id) {
              isInKPIList = true
            }
          })
          if (!isInKPIList) {
            this.userWeightsOtherKPI.push(weight)
          }
        })

        this.KPI_valuesList.forEach(kpiValue => {
          let index = this.bussinessKPIs.findIndex(x => x.kpi_id === kpiValue.kpi_id)
          if (index > -1) {
            let KPIDef = this.bussinessKPIs[index];
            let kpiWithValue = new MyKPIsValues();
            kpiWithValue.kpi_id = kpiValue.kpi_id;
            kpiWithValue.title = KPIDef.title;
            kpiWithValue.default_weight = KPIDef.default_weight;
            kpiWithValue.description = KPIDef.description;
            kpiWithValue.normalized_value = kpiValue.normalized_value;
            kpiWithValue.original_value = kpiValue.original_value;
            kpiWithValue.dashoffset = this.f.getNormalValueCircunferenceComplete(this.circumference, kpiValue.normalized_value);
            kpiWithValue.period_id = kpiValue.period_id;
            kpiWithValue.platform_id = kpiValue.platform_id;
            kpiWithValue.unit_of_measurement = KPIDef.unit_of_measurement;

            KPIsList.push(kpiWithValue);

            let userWeightValue = Math.round(kpiWithValue.default_weight);
            let hasUW = false;

            this.userWeights.forEach(weigth => {
              if (weigth.kpi_id == kpiValue.kpi_id) {
                userWeightValue = weigth.kpi_weight;
                hasUW = true;
              }
            })

            let tableItem: kpiMonitoringDataTable;
            tableItem = {
              KPI_id: kpiWithValue.kpi_id,
              KPI_title: kpiWithValue.title,
              KPI_description: kpiWithValue.description,
              original_value: kpiWithValue.original_value,
              default_weight: kpiWithValue.default_weight,
              user_weight: userWeightValue,
              normalized_value: kpiWithValue.normalized_value,
              hasUserWeigh: hasUW,
              unit_of_measurement: kpiWithValue.unit_of_measurement
            }
            this.allDataTableItems.push(tableItem);
          }
        })
        this.displayKPIs = [];
        if (KPIsList != []) {
          var arraySize = 3;
          for (var i = 0; i < Math.ceil(KPIsList.length / arraySize); i++) {
            this.displayKPIs.push(KPIsList.slice(i * arraySize, i * arraySize + arraySize));
          }
        }
        this.updateDataSource();
        this.updateDimensionScore();
      })
  }

  updateDataSource() {
    this.tableDataSource = new MatTableDataSource(this.allDataTableItems);
    this.tableDataSource.filterPredicate = (data: kpiMonitoringDataTable, filter: string): boolean => {
      const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
        return (currentTerm + (data as { [key: string]: any })[key] + '◬');
      }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      return dataStr.indexOf(transformedFilter) != -1;
    }
  }

  showEvolution(kpi_id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "80%";
    dialogConfig.width = "80%";
    dialogConfig.data = {
      kpi_id: kpi_id
    }
    const modalDialog = this.matDialog.open(ModalEvolutionKpiComponent, dialogConfig);
    /*this.translate.get('kpi_evolution_over_time').subscribe(value => {
      this.title_graph = 'KPI_'
      if (kpi_id < 10) {
        this.title_graph += '0'
      }
      this.title_graph += kpi_id + ' ' + value;
    });

    if (this.evolution_kpi_id == kpi_id) {
      this.showGraph = !this.showGraph
    }
    else {
      this.showGraph = true;
    }

    this.evolution_kpi_id = kpi_id;

    this.barChartNormalLabels = new Array<string>()
    this.barChartOriginalLabels = new Array<string>()

    let dataNormal = [];
    let dataOriginal = [];
    this.kpiServices.getKPIEvolutionByPlatId(this.platformSelected.platform_id, kpi_id).subscribe(
      response => {
        let responseData = response['KPI_values'];
        responseData.forEach(item => {
          dataNormal.push(item["normalized_value"]);
          dataOriginal.push(item["original_value"]);
          this.barChartNormalLabels.push(this.f.getKPIPeriodTitleForChart(item["period_id"]))
          this.barChartOriginalLabels.push(this.f.getKPIPeriodTitleForChart(item["period_id"]))
        })

      });
    this.chartNormalizedEvolution[0]["data"] = dataNormal;
    this.chartOriginalEvolution[0]["data"] = dataOriginal;*/
  }

  openEvolutionDimensionModal() {
    const dimension = constants.KPI_dimension.B;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "80%";
    dialogConfig.width = "80%";
    dialogConfig.data = {
      score_id: this.dim_id,
      type: "dimension",
      dimension: dimension,
      platform_id: this.platformSelected.platform_id
    }
    const modalDialog = this.matDialog.open(ModalEvolutionComponent, dialogConfig,);
  }

  changeWeight(data: kpiMonitoringDataTable, type) {
    let index = this.allDataTableItems.indexOf(data);
    if (index != -1) {
      if (type == 'remove') {
        if (data.user_weight >= 0) {
          this.isWeightChanged = true;
          data.user_weight--;
          data.hasUserWeigh = true;
        }
      }
      else if (type == 'add') {
        if (data.user_weight < 10) {
          this.isWeightChanged = true;
          data.user_weight++;
          data.hasUserWeigh = true;
        }
      }
      this.allDataTableItems[index] = data;
      this.updateDataSource();
    }
  }

  restoreDefaultWeight(data: kpiMonitoringDataTable) {
    let index = this.allDataTableItems.indexOf(data);
    if (index != -1) {

      if (data.user_weight >= 0) {
        this.isWeightChanged = true;
        data.user_weight = Math.round(data.default_weight)
        data.hasUserWeigh = false;
      }

      this.allDataTableItems[index] = data;
      this.updateDataSource();
    }
  }

  checkButton(data: kpiMonitoringDataTable, type) {
    if (type == 'remove') {
      if (data.user_weight < 1) {
        return true;
      }
      else
        return false;
    }
    else if (type == 'add') {
      if (data.user_weight >= 10) {
        return true;
      }
      else
        return false;
    }
    else if (type == 'restore') {
      return !data.hasUserWeigh;
    }
  }

  updateDimensionScore() {
    this.isLoadingScore = true
    this.score = "?"
    if (this.isLogged) {
      this.scoresService.scoreOfDimensionAndPlatformForPeriodLoggedUser(this.dim_id, this.platformSelected.platform_id, this.period_selected_id).
        subscribe((scoreR) => {
          this.score = scoreR
          this.isLoadingScore = false
        })
    }
    else {
      this.scoresService.scoreOfDimensionAndPlatformForPeriod(this.dim_id, this.platformSelected.platform_id, this.period_selected_id).
        subscribe((scoreR) => {
          this.score = scoreR
          this.isLoadingScore = false
        })
    }
  }

  save() {
    this.isLoadingScore = true
    this.score = "?"
    let body = {} as userWeights;
    body.user_id = this.userDOA.getToken();
    body.KPI_weights = [];
    body.tooltype_id = 1;
    this.allDataTableItems.forEach(data => {
      if (data.hasUserWeigh) {
        let weightToSend = {} as KPI_weightsToSend
        weightToSend.KPI_id = data.KPI_id;
        weightToSend.weight = data.user_weight;
        body.KPI_weights.push(weightToSend);
      }
    })

    this.userWeightsOtherKPI.forEach(x => {
      let weightToSend = {} as KPI_weightsToSend;
      weightToSend.KPI_id = x.kpi_id;
      weightToSend.weight = x.kpi_weight;
      body.KPI_weights.push(weightToSend);
    })

    this.userDOA.insertNewUserWeights(body).subscribe(
      response => {

        this.isWeightChanged = false;
        this.updateDimensionScore();
        this.userWeights = this.userDOA.getUserWeigths();
      },
      error => {
        console.log("error", error)
        //this.statisticsService.updateStatisticsListInfo;
      });
  }

}