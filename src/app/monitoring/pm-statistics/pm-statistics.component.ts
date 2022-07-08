import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatisticsDOAService } from 'src/app/api/DOA/statistics-doa.service';
import { ModalEvolutionStatisticsComponent } from 'src/app/components/modal-evolution-statistics/modal-evolution-statistics.component';
import { Platform } from 'src/app/models/platform';
import { StatisticsValues, MyStatisticsValues, Statistics } from 'src/app/models/statistics';
import { EncryptedStorageService } from 'src/app/utilities/encryptedStorageService';
import { FunctionsComponent } from 'src/app/utilities/functions';
import *  as constants from '../../utilities/constants';

@Component({
  selector: 'app-pm-statistics',
  templateUrl: './pm-statistics.component.html',
  styleUrls: ['./pm-statistics.component.css']
})
export class PMStatisticsComponent implements OnInit {
  f = new FunctionsComponent();
  periods = this.f.getValidStatisticsValuesPeriods();
  period_selected_id;

  title_graph = "";
  showEvolutionGraph = false;
  evolution_statistics_id = -1;

  statisticsTypes = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_statisticsTypes));

  platformSelected: Platform = this.f.getPlatformSelected();
  statisticsToShow: any = [];

  public chartEvolution: ChartDataSets[] = [
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

  public chartsLabels: Label[];

  constructor(private statisticsService: StatisticsDOAService,
    private secureStorage: EncryptedStorageService,
    public matDialog: MatDialog) { }

  ngOnInit() {
    this.period_selected_id = this.periods[0].measurement_period_id;
    this.chartsLabels = new Array<string>();
    this.refreshPageWithNewPeriod();
  }

  showEvolution(statistics_id) {
    let index = this.statisticsTypes.findIndex(x => x.statistics_id === statistics_id)
    if (index > -1) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "80%";
      dialogConfig.width = "80%";
      dialogConfig.data = {
        statistic_id: statistics_id,
        statistic_title: this.statisticsTypes[index].title,
        is_percent: this.statisticsTypes[index].is_percentage
      }
      const modalDialog = this.matDialog.open(ModalEvolutionStatisticsComponent, dialogConfig);

    }

    /*
    
    
    
    
    
        let index = this.statisticsTypes.findIndex(x => x.statistics_id === statistics_id)
        if (index > -1) {
          this.title_graph = this.statisticsTypes[index].title;
        }
        if (this.evolution_statistics_id == statistics_id) {
          this.showEvolutionGraph = !this.showEvolutionGraph
        }
        else {
          this.showEvolutionGraph = true;
        }
    
        this.evolution_statistics_id = statistics_id;
    
        this.chartsLabels = new Array<string>()
        this.chartEvolution = [
          { data: [], fill: false, hoverBackgroundColor: "rgb(35, 166, 173)", backgroundColor: "rgb(35, 166, 173)", label: '' }
        ];
        let periodsEvolution = JSON.parse(this.secureStorage.decryptLocalSecureStorage(constants.lSN_measurementsPeriodStatisticsValues));
        let data = [];
        this.statisticsService.getStatisticEvolutionByPlatform(this.platformSelected.platform_id, statistics_id).subscribe(
          response => {
            let responseData = response['statistics_values'];
    
            periodsEvolution.reverse().forEach(period => {
    
              let value = "--"
              responseData.forEach(item => {
                if (item["period_id"] == period.measurement_period_id) {
                  value = item["statistics_value"];
                }
    
              })
              data.push(value);
              this.chartsLabels.push(this.f.getStatisticsPeriodTitleForChart(period.measurement_period_id))
            })
            /*responseData.forEach(item => {
              data.push(item["statistics_value"]);
              this.chartsLabels.push(this.f.getStatisticsPeriodTitleForChart(item["period_id"]))
            })*/

    /*  });
    this.chartEvolution[0]["data"] = data;*/
  }

  refreshPageWithNewPeriod() {
    this.showEvolutionGraph = false;
    this.statisticsService.getStatisticsValuesByPlatformPeriod(this.platformSelected.platform_id, this.period_selected_id).
      subscribe(result => {
        let listStatistics = result['statistics_values'];
        let statisticsValuesArray: StatisticsValues[] = []
        this.statisticsTypes.forEach(statisticType => {
          let index = listStatistics.findIndex(x => x.statistics_id === statisticType.statistics_id)
          if (index > -1) {
            let item = listStatistics[index];
            let statisticValue = new MyStatisticsValues();
            statisticValue.statistics_id = statisticType.statistics_id;
            statisticValue.is_percentage = statisticType.is_percentage;
            statisticValue.title = statisticType.title;
            statisticValue.larger_is_better = statisticType.larger_is_better;
            statisticValue.period_id = item.period_id;
            statisticValue.platform_id = item.platform_id;
            statisticValue.value = item.statistics_value;
            statisticsValuesArray.push(statisticValue);
          }
          else {
            let statisticValue = new MyStatisticsValues();
            statisticValue.statistics_id = statisticType.statistics_id;
            statisticValue.is_percentage = statisticType.is_percentage;
            statisticValue.title = statisticType.title;
            statisticValue.larger_is_better = statisticType.larger_is_better;
            statisticsValuesArray.push(statisticValue);
            statisticValue.value = "--";
          }
        })

        this.statisticsToShow = [];
        if (statisticsValuesArray != []) {
          var arraySize = 2;
          for (var i = 0; i < Math.ceil(statisticsValuesArray.length / arraySize); i++) {
            this.statisticsToShow.push(statisticsValuesArray.slice(i * arraySize, i * arraySize + arraySize));
          }
        }
      })
  }
}
