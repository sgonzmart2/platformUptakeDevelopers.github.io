import { Component, Inject, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import *  as constants from '../../utilities/constants';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'src/app/models/platform';
import { KpiDoaService } from 'src/app/api/DOA/kpi-doa.service';
import { FunctionsComponent } from '../../utilities/functions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StatisticsDOAService } from 'src/app/api/DOA/statistics-doa.service';

@Component({
  selector: 'app-modal-evolution-statistics',
  templateUrl: './modal-evolution-statistics.component.html',
  styleUrls: ['./modal-evolution-statistics.component.css']
})
export class ModalEvolutionStatisticsComponent implements OnInit {

  isPercentage = false;
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

  public barChartOptionsPercentage: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1,
          min: 0,
          suggestedMax: 1,
          callback: function (value) {
            return value + '%';
          },
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

  nameGraph;

  public barChartEvolutionLabels: Label[];
  f = new FunctionsComponent();
  platformSelected: Platform = this.f.getPlatformSelected();

  periods = this.f.getValidStatisticsValuesPeriods();
  constructor(
    public dialogRef: MatDialogRef<ModalEvolutionStatisticsComponent>,
    private translate: TranslateService,
    private statisticsService: StatisticsDOAService,
    @Inject(MAT_DIALOG_DATA) private modalData: any
  ) { }

  ngOnInit() {
    this.getKPIEvolution();
  }

  ngAfterViewInit() {
    //this.getEvolution();
  }

  actionFunction() {
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  getKPIEvolution() {
    let statistic_id = this.modalData.statistic_id;
    this.isPercentage = this.modalData.is_percent;
    this.translate.get('evolution_of_title').subscribe(value => {
      this.nameGraph = value + this.modalData.statistic_title;
    });


    this.barChartEvolutionLabels = new Array<string>()


    let data = [];
    this.statisticsService.getStatisticEvolutionByPlatform(this.platformSelected.platform_id, statistic_id).subscribe(
      response => {
        let responseData = response['statistics_values'];

        this.periods.reverse().forEach(period => {

          let value = "--"
          responseData.forEach(item => {
            if (item["period_id"] == period.measurement_period_id) {
              value = item["statistics_value"];
            }

          })
          data.push(value);
          this.barChartEvolutionLabels.push(this.f.getStatisticsPeriodTitleForChart(period.measurement_period_id))
        })
      })
    this.chartEvolution[0]["data"] = data;
  }
}
